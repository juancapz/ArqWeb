const API_BASE = '/api';

document.addEventListener('DOMContentLoaded', loadReport);

async function loadReport() {
    try {
        const response = await fetch(`${API_BASE}/reports/severity-distribution`);
        if (!response.ok) throw new Error('Error al cargar el reporte');
        const data = await response.json();
        
        renderCards(data);
        renderBarChart(data);
        renderTotal(data);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    const severities = [
        { key: 'Crítica', class: 'critica' },
        { key: 'Alta', class: 'alta' },
        { key: 'Media', class: 'media' },
        { key: 'Baja', class: 'baja' }
    ];
    
    for (const s of severities) {
        const card = document.createElement('div');
        card.className = `stat-card ${s.class}`;
        card.innerHTML = `
            <span class="stat-label">${s.key}</span>
            <span class="stat-value">${data[s.key] || 0}</span>
        `;
        container.appendChild(card);
    }
}

function renderBarChart(data) {
    const container = document.getElementById('bar-chart-container');
    container.innerHTML = '<h3 style="margin-bottom: 1rem; font-size: 1rem;">Proporción visual</h3>';
    
    const severities = [
        { key: 'Crítica', class: 'critica' },
        { key: 'Alta', class: 'alta' },
        { key: 'Media', class: 'media' },
        { key: 'Baja', class: 'baja' }
    ];
    
    // Calcular el máximo para escalar las barras
    const max = Math.max(...severities.map(s => data[s.key] || 0));
    
    for (const s of severities) {
        const count = data[s.key] || 0;
        const percentage = max > 0 ? (count / max) * 100 : 0;
        
        const row = document.createElement('div');
        row.className = 'bar-row';
        row.innerHTML = `
            <div class="bar-label">${s.key}</div>
            <div class="bar-container">
                <div class="bar-fill ${s.class}" style="width: ${percentage}%"></div>
            </div>
            <div class="bar-count">${count}</div>
        `;
        container.appendChild(row);
    }
}

function renderTotal(data) {
    const total = Object.values(data).reduce((sum, count) => sum + count, 0);
    document.getElementById('total-value').textContent = total;
}

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