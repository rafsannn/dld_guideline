const courseData = [
    {
        priority: 'High',
        topic: 'Number Base Conversions (Including fractions)',
        chapter: 'Ch 1. Digital Systems',
        section: '1.2, 1.3',
        pages: '4 - 9',
        scope: 'Full procedural knowledge',
        type: 'Numerical'
    },
    {
        priority: 'High',
        topic: '1\'s and 2\'s Complements',
        chapter: 'Ch 1. Digital Systems',
        section: '1.5',
        pages: '13 - 16',
        scope: 'Subtraction method examples',
        type: 'Numerical'
    },
    {
        priority: 'Low',
        topic: 'Parity Bit',
        chapter: 'Ch 1. Digital Systems',
        section: '1.7',
        pages: '21 - 22',
        scope: 'Concept & Error detection theory',
        type: 'Theory'
    },
    {
        priority: 'High',
        topic: 'De Morgan\'s Law Proofs',
        chapter: 'Ch 2. Boolean Algebra',
        section: '2.4',
        pages: '43 - 46',
        scope: 'Truth table verification',
        type: 'Mixed'
    },
    {
        priority: 'High',
        topic: 'Boolean Algebraic Simplification',
        chapter: 'Ch 2. Boolean Algebra',
        section: '2.4',
        pages: '46 - 48',
        scope: 'Manual reduction of literals',
        type: 'Numerical'
    },
    {
        priority: 'Medium',
        topic: 'Minterms & Maxterms',
        chapter: 'Ch 2. Boolean Algebra',
        section: '2.5',
        pages: '49 - 53',
        scope: 'Definitions & Mapping',
        type: 'Mixed'
    },
    {
        priority: 'High',
        topic: 'Canonical Form Conversions',
        chapter: 'Ch 2. Boolean Algebra',
        section: '2.6',
        pages: '53 - 57',
        scope: 'SOP to POS and vice versa',
        type: 'Numerical'
    },
    {
        priority: 'High',
        topic: 'Karnaugh Maps (3-4 Variables)',
        chapter: 'Ch 3. Gate-Level Minimization',
        section: '3.2, 3.3',
        pages: '73 - 81',
        scope: 'Primary simplification technique',
        type: 'Numerical'
    },
    {
        priority: 'Medium',
        topic: 'Don\'t-Care Conditions',
        chapter: 'Ch 3. Gate-Level Minimization',
        section: '3.6',
        pages: '87 - 89',
        scope: 'Optimizing K-maps with d-terms',
        type: 'Numerical'
    }
];

function switchTab(tabId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
        section.classList.remove('block');
    });
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active-tab', 'text-white', 'bg-indigo-700', 'border-white');
        tab.classList.add('text-indigo-200', 'border-transparent');
    });
    const activeSection = document.getElementById(tabId);
    if (!activeSection) return;
    activeSection.classList.remove('hidden');
    activeSection.classList.add('block');
    const activeTab = document.getElementById(`tab-${tabId}`);
    if (!activeTab) return;
    activeTab.classList.remove('text-indigo-200', 'border-transparent');
    activeTab.classList.add('active-tab', 'text-white', 'bg-indigo-700', 'border-white');
    if(tabId === 'analysis') { initCharts(); }
}

function renderTable(filterPriority = 'All') {
    const tbody = document.getElementById('mapping-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    const filteredData = filterPriority === 'All' 
        ? courseData 
        : courseData.filter(item => item.priority === filterPriority);
    filteredData.forEach(item => {
        let badgeClass = item.priority === 'High' ? 'priority-high' : (item.priority === 'Medium' ? 'priority-med' : 'priority-low');
        let icon = item.priority === 'High' ? '🔴' : (item.priority === 'Medium' ? '🟡' : '🟢');
        const row = `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}">
                        ${icon} ${item.priority}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm font-medium text-slate-900">${item.topic}</td>
                <td class="px-6 py-4 text-sm text-slate-500">${item.chapter}<br><span class="text-xs text-indigo-500">Sec: ${item.section}</span></td>
                <td class="px-6 py-4 text-sm font-bold text-slate-700">Pg: ${item.pages}</td>
                <td class="px-6 py-4 text-sm text-slate-500">${item.scope}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function renderRoadmap() {
    const container = document.getElementById('timeline-container');
    if (!container) return;
    container.innerHTML = '';
    courseData.forEach((item, index) => {
        const stepHtml = `
            <div class="timeline-step">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-2">
                    <h3 class="text-lg font-bold text-slate-800">Step ${index + 1}: ${item.topic}</h3>
                    <span class="inline-block px-2 py-1 rounded text-xs font-bold bg-slate-100 w-max">Priority: ${item.priority}</span>
                </div>
                <div class="text-sm text-slate-600 mb-2">📘 Pg: ${item.pages} | ${item.chapter}</div>
                <p class="text-sm text-slate-500"><strong>Action:</strong> ${item.scope}</p>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', stepHtml);
    });
}

let barChartInstance = null;
let pieChartInstance = null;

function initCharts() {
    const topicCanvas = document.getElementById('topicChart');
    if (!topicCanvas) return;
    const ctx1 = topicCanvas.getContext('2d');
    if (barChartInstance) barChartInstance.destroy();
    barChartInstance = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Base Conv.', 'Complements', 'Boolean Simpl.', 'Canonical/TT', 'K-Maps'],
            datasets: [{
                label: 'Weight',
                data: [5, 4, 6, 7, 8],
                backgroundColor: 'rgba(79, 70, 229, 0.7)',
                borderColor: 'rgb(79, 70, 229)',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });

    const typeCanvas = document.getElementById('typeChart');
    if (!typeCanvas) return;
    const ctx2 = typeCanvas.getContext('2d');
    if (pieChartInstance) pieChartInstance.destroy();
    pieChartInstance = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Numerical', 'Truth Tables', 'Theory'],
            datasets: [{
                data: [70, 15, 15],
                backgroundColor: ['rgba(79, 70, 229, 0.8)', 'rgba(56, 189, 248, 0.8)', 'rgba(148, 163, 184, 0.8)']
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderTable();
    renderRoadmap();
    initCharts();
});