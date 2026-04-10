// Hit counter, points, and scores (demo logic)
let hitCount = localStorage.getItem('hitCounter') || 0;
let points = localStorage.getItem('points') || 0;
let scores = localStorage.getItem('scores') || 0;

document.getElementById('hitCounter').textContent = hitCount;
document.getElementById('points').textContent = points;
document.getElementById('scores').textContent = scores;

// Increment hit counter on page load
hitCount++;
document.getElementById('hitCounter').textContent = hitCount;
localStorage.setItem('hitCounter', hitCount);

// Minimal Chart.js-like bar chart
function drawBarChart(ctx, labels, data, colors) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const max = Math.max(...data, 1);
    const barWidth = 40;
    const gap = 40;
    for (let i = 0; i < data.length; i++) {
        const x = 40 + i * (barWidth + gap);
        const y = ctx.canvas.height - (data[i] / max) * 100 - 20;
        const h = (data[i] / max) * 100;
        ctx.fillStyle = colors[i];
        ctx.fillRect(x, y, barWidth, h);
        ctx.fillStyle = '#000';
        ctx.fillText(labels[i], x, ctx.canvas.height - 5);
        ctx.fillText(data[i], x + 10, y - 5);
    }
}

// Minimal Chart.js-like radar chart
function drawRadarChart(ctx, labels, data, color) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const center = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 };
    const radius = 70;
    const max = Math.max(...data, 1);
    // Draw axes
    for (let i = 0; i < data.length; i++) {
        const angle = (Math.PI * 2 / data.length) * i;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle));
        ctx.strokeStyle = '#bbb';
        ctx.stroke();
    }
    // Draw polygon
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
        const angle = (Math.PI * 2 / data.length) * i;
        const r = (data[i] / max) * radius;
        if (i === 0) ctx.moveTo(center.x + r * Math.cos(angle), center.y + r * Math.sin(angle));
        else ctx.lineTo(center.x + r * Math.cos(angle), center.y + r * Math.sin(angle));
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.3;
    ctx.fill();
    ctx.globalAlpha = 1.0;
    ctx.strokeStyle = color;
    ctx.stroke();
    // Draw labels
    ctx.fillStyle = '#000';
    for (let i = 0; i < labels.length; i++) {
        const angle = (Math.PI * 2 / labels.length) * i;
        ctx.fillText(labels[i], center.x + (radius + 10) * Math.cos(angle) - 10, center.y + (radius + 10) * Math.sin(angle));
    }
}

// Draw charts
const barCtx = document.getElementById('customChart').getContext('2d');
drawBarChart(barCtx, ['Hits', 'Points', 'Scores'], [hitCount, points, scores], ['#4caf50', '#2196f3', '#ff9800']);

const radarCtx = document.getElementById('spiderChart').getContext('2d');
drawRadarChart(radarCtx, ['Hits', 'Points', 'Scores', 'Skill', 'Luck'], [hitCount % 10, points % 10, scores % 10, 7, 5], '#2196f3');

// Breadcrumbs update (demo)
const breadcrumbs = document.getElementById('breadcrumbs');
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        const section = this.textContent;
        breadcrumbs.textContent = `Home > ${section}`;
    });
});
