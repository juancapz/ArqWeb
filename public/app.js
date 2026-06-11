// ============================================================================
// CONFIGURACIÓN GLOBAL
// ============================================================================

const API_BASE = '/api';

// Cache de assets y users para no pedirlos cada vez
let assetsCache = [];
let usersCache = [];

// ============================================================================
// INICIALIZACIÓN: al cargar la página, traer datos y configurar listeners
// ============================================================================

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar assets y users una sola vez (los usamos para mostrar nombres y poblar los selects)
    await Promise.all([loadAssets(), loadUsers()]);
    
    // Cargar las vulnerabilidades
    await loadVulnerabilities();
    
    // Configurar los listeners de los botones y el formulario
    setupEventListeners();
});

// ============================================================================
// CARGA DE DATOS DESDE LA API
// ============================================================================

async function loadAssets() {
    try {
        const response = await fetch(`${API_BASE}/assets`);
        assetsCache = await response.json();
        populateSelect('form-asset', assetsCache, 'name');
    } catch (error) {
        showToast('Error al cargar assets', 'error');
    }
}

async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE}/users`);
        usersCache = await response.json();
        populateSelect('form-assigned', usersCache, 'name', true);
    } catch (error) {
        showToast('Error al cargar usuarios', 'error');
    }
}

async function loadVulnerabilities() {
    try {
        // Armar query string con los filtros activos
        const severityFilter = document.getElementById('filter-severity').value;
        const statusFilter = document.getElementById('filter-status').value;
        
        const params = new URLSearchParams();
        if (severityFilter) params.append('severity', severityFilter);
        if (statusFilter) params.append('status', statusFilter);
        
        const queryString = params.toString();
        const url = `${API_BASE}/vulnerabilities${queryString ? '?' + queryString : ''}`;
        
        const response = await fetch(url);
        const vulnerabilities = await response.json();
        
        renderTable(vulnerabilities);
    } catch (error) {
        showToast('Error al cargar vulnerabilidades', 'error');
    }
}

// ============================================================================
// RENDERIZADO DE LA TABLA
// ============================================================================

function renderTable(vulnerabilities) {
    const tbody = document.getElementById('vulnerabilities-body');
    tbody.innerHTML = '';
    
    if (vulnerabilities.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding: 2rem; color: #95a5a6;">No hay vulnerabilidades para mostrar</td></tr>';
        return;
    }
    
    for (const v of vulnerabilities) {
        const assetName = getAssetName(v.assetId);
        const assignedName = getUserName(v.assignedTo);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${v.id}</td>
            <td>${escapeHtml(v.title)}</td>
            <td><span class="badge ${getSeverityClass(v.severity)}">${v.severity}</span></td>
            <td><span class="badge ${getStatusClass(v.status)}">${v.status}</span></td>
            <td>${v.cve || '-'}</td>
            <td>${assetName}</td>
            <td>${assignedName}</td>
            <td class="actions">
                <button onclick="openEditModal(${v.id})">Editar</button>
                <button class="btn-danger" onclick="deleteVulnerability(${v.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

// ============================================================================
// HELPERS DE FORMATEO
// ============================================================================

function getAssetName(assetId) {
    const asset = assetsCache.find(a => a.id === assetId);
    return asset ? asset.name : `Asset #${assetId}`;
}

function getUserName(userId) {
    if (!userId) return '<em style="color:#95a5a6">Sin asignar</em>';
    const user = usersCache.find(u => u.id === userId);
    return user ? user.name : `User #${userId}`;
}

function getSeverityClass(severity) {
    const map = {
        'Crítica': 'badge-critica',
        'Alta': 'badge-alta',
        'Media': 'badge-media',
        'Baja': 'badge-baja'
    };
    return map[severity] || '';
}

function getStatusClass(status) {
    const map = {
        'Abierta': 'badge-abierta',
        'En progreso': 'badge-en-progreso',
        'Resuelta': 'badge-resuelta'
    };
    return map[status] || '';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============================================================================
// POBLAR SELECTS DEL FORMULARIO
// ============================================================================

function populateSelect(selectId, items, labelField, allowEmpty = false) {
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    
    if (allowEmpty) {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Sin asignar';
        select.appendChild(emptyOption);
    } else {
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Seleccionar';
        select.appendChild(placeholder);
    }
    
    for (const item of items) {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item[labelField];
        select.appendChild(option);
    }
}

// ============================================================================
// MODAL DE CREAR / EDITAR
// ============================================================================

function openCreateModal() {
    document.getElementById('modal-title').textContent = 'Nueva vulnerabilidad';
    document.getElementById('vulnerability-form').reset();
    document.getElementById('form-id').value = '';
    document.getElementById('form-status').value = 'Abierta';
    document.getElementById('modal').classList.remove('hidden');
}

function openEditModal(id) {
    fetch(`${API_BASE}/vulnerabilities/${id}`)
        .then(r => r.json())
        .then(v => {
            document.getElementById('modal-title').textContent = `Editar vulnerabilidad #${id}`;
            document.getElementById('form-id').value = v.id;
            document.getElementById('form-title').value = v.title;
            document.getElementById('form-description').value = v.description || '';
            document.getElementById('form-cve').value = v.cve || '';
            document.getElementById('form-severity').value = v.severity;
            document.getElementById('form-cvss').value = v.cvssScore || '';
            document.getElementById('form-status').value = v.status;
            document.getElementById('form-asset').value = v.assetId;
            document.getElementById('form-assigned').value = v.assignedTo || '';
            document.getElementById('form-discovered').value = v.discoveredAt;
            document.getElementById('form-fixed').value = v.fixedAt || '';
            document.getElementById('modal').classList.remove('hidden');
        })
        .catch(() => showToast('Error al cargar la vulnerabilidad', 'error'));
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// ============================================================================
// ENVIAR FORMULARIO (CREATE o UPDATE según haya id)
// ============================================================================

async function submitForm(event) {
    event.preventDefault();
    
    const id = document.getElementById('form-id').value;
    const isEdit = !!id;
    
    // Construir el objeto con los datos del formulario
    const data = {
        title: document.getElementById('form-title').value.trim(),
        severity: document.getElementById('form-severity').value,
        status: document.getElementById('form-status').value,
        assetId: Number(document.getElementById('form-asset').value),
        discoveredAt: document.getElementById('form-discovered').value
    };
    
    // Campos opcionales
    const description = document.getElementById('form-description').value.trim();
    if (description) data.description = description;
    
    const cve = document.getElementById('form-cve').value.trim();
    if (cve) data.cve = cve;
    
    const cvss = document.getElementById('form-cvss').value;
    if (cvss) data.cvssScore = Number(cvss);
    
    const assigned = document.getElementById('form-assigned').value;
    if (assigned) data.assignedTo = Number(assigned);
    
    const fixed = document.getElementById('form-fixed').value;
    if (fixed) data.fixedAt = fixed;
    
    try {
        const url = isEdit 
            ? `${API_BASE}/vulnerabilities/${id}` 
            : `${API_BASE}/vulnerabilities`;
        
        const response = await fetch(url, {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al guardar');
        }
        
        closeModal();
        showToast(isEdit ? 'Vulnerabilidad actualizada' : 'Vulnerabilidad creada', 'success');
        await loadVulnerabilities();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// ============================================================================
// ELIMINAR
// ============================================================================

async function deleteVulnerability(id) {
    if (!confirm(`¿Eliminar la vulnerabilidad #${id}? Esta acción no se puede deshacer.`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/vulnerabilities/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al eliminar');
        }
        
        showToast('Vulnerabilidad eliminada', 'success');
        await loadVulnerabilities();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// ============================================================================
// TOAST (notificación flotante)
// ============================================================================

let toastTimeout;
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

function setupEventListeners() {
    document.getElementById('btn-new').addEventListener('click', openCreateModal);
    document.getElementById('btn-cancel').addEventListener('click', closeModal);
    document.getElementById('vulnerability-form').addEventListener('submit', submitForm);
    document.getElementById('btn-apply-filters').addEventListener('click', loadVulnerabilities);
    document.getElementById('btn-clear-filters').addEventListener('click', () => {
        document.getElementById('filter-severity').value = '';
        document.getElementById('filter-status').value = '';
        loadVulnerabilities();
    });
    
    // Cerrar modal al hacer click afuera
    document.getElementById('modal').addEventListener('click', (e) => {
        if (e.target.id === 'modal') closeModal();
    });
}

// Hacer funciones accesibles desde los onclick inline del HTML
window.openEditModal = openEditModal;
window.deleteVulnerability = deleteVulnerability;