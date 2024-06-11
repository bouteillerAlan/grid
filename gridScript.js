let gridState = 0; // 0: hidden, 1: grid only, 2: grid + info
let canvas, ctx;

const settings = {
    mobile: {
        columns: 4,
        gutterWidth: 10,
        marginWidth: 10,
    },
    desktop: {
        columns: 12,
        gutterWidth: 20,
        marginWidth: 20,
    },
    breakpoint: 450, // default breakpoint
};

function createCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'gridDesign';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.display = 'block';
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
}

function removeCanvas() {
    if (canvas) {
        document.body.removeChild(canvas);
        canvas = null;
        ctx = null;
    }
}

function drawGrid() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isMobile = viewportWidth < settings.breakpoint;
    const numColumns = isMobile ? settings.mobile.columns : settings.desktop.columns;
    const gutterWidth = isMobile ? settings.mobile.gutterWidth : settings.desktop.gutterWidth;
    const marginWidth = isMobile ? settings.mobile.marginWidth : settings.desktop.marginWidth;
    const totalWidth = viewportWidth - 2 * marginWidth;

    canvas.width = viewportWidth;
    canvas.height = viewportHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const columnWidth = (totalWidth - (numColumns - 1) * gutterWidth) / numColumns;
    const startX = marginWidth;

    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';

    for (let i = 0; i < numColumns; i++) {
        const x = startX + i * (columnWidth + gutterWidth);
        ctx.fillRect(x, 0, columnWidth, viewportHeight);
    }

    if (gridState === 2) {
        // draw grid infos
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(viewportWidth - 220, 10, 210, 110);

        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText(`Columns: ${numColumns}`, viewportWidth - 210, 30);
        ctx.fillText(`Gutter Width: ${gutterWidth}px`, viewportWidth - 210, 50);
        ctx.fillText(`Margin Width: ${marginWidth}px`, viewportWidth - 210, 70);
        ctx.fillText(`Breakpoint: ${settings.breakpoint}px`, viewportWidth - 210, 90);
        ctx.fillText(`Viewport: ${isMobile ? 'Mobile' : 'Desktop'}`, viewportWidth - 210, 110);
    }
}

function toggleGrid() {
    gridState = (gridState + 1) % 3;
    if (gridState === 1 || gridState === 2) {
        if (!canvas) {
            createCanvas();
        }
        drawGrid();
    } else {
        removeCanvas();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'g') {
        event.preventDefault();
        toggleGrid();
    }
});

window.addEventListener('resize', function() {
    if (gridState === 1 || gridState === 2) {
        drawGrid();
    }
});
