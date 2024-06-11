        let gridState = 0; // 0: hidden, 1: grid only, 2: grid + info
        let showHorizontalLines = false; // Toggle horizontal lines on or off
        let canvas, ctx;

        const settings = {
            mobile: {
                columns: 4,
                gutterWidth: 10,
                marginWidth: 10,
                horizontalSpacing: '1em', // Horizontal line spacing
            },
            desktop: {
                columns: 12,
                gutterWidth: 20,
                marginWidth: 20,
                horizontalSpacing: '1em', // Horizontal line spacing
            },
            breakpoint: 450, // default breakpoint
            lineColors: {
                columns: 'rgba(255, 0, 0, 0.5)', // Column color
                lines: 'rgba(0, 0, 255, 0.5)', // Horizontal line color
            }
        };

        // Create and configure the canvas element
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

        // Remove the canvas element
        function removeCanvas() {
            if (canvas) {
                document.body.removeChild(canvas);
                canvas = null;
                ctx = null;
            }
        }

        // Convert spacing to pixels
        function convertSpacingToPixels(spacing) {
            if (spacing.endsWith('px')) {
                return parseInt(spacing, 10);
            } else if (spacing.endsWith('em')) {
                const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
                return parseFloat(spacing) * fontSize;
            }
            return parseInt(spacing, 10); // Default to pixel value if no unit is specified
        }

        // Draw the grid
        function drawGrid() {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const isMobile = viewportWidth < settings.breakpoint;
            const numColumns = isMobile ? settings.mobile.columns : settings.desktop.columns;
            const gutterWidth = isMobile ? settings.mobile.gutterWidth : settings.desktop.gutterWidth;
            const marginWidth = isMobile ? settings.mobile.marginWidth : settings.desktop.marginWidth;
            const horizontalSpacing = convertSpacingToPixels(isMobile ? settings.mobile.horizontalSpacing : settings.desktop.horizontalSpacing);
            const totalWidth = viewportWidth - 2 * marginWidth;

            canvas.width = viewportWidth;
            canvas.height = viewportHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const columnWidth = (totalWidth - (numColumns - 1) * gutterWidth) / numColumns;
            const startX = marginWidth;

            ctx.fillStyle = settings.lineColors.columns;

            for (let i = 0; i < numColumns; i++) {
                const x = startX + i * (columnWidth + gutterWidth);
                ctx.fillRect(x, 0, columnWidth, viewportHeight);
            }

            if (showHorizontalLines) {
                ctx.strokeStyle = settings.lineColors.lines;
                ctx.lineWidth = 1;
                for (let y = 0; y <= viewportHeight; y += horizontalSpacing) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(viewportWidth, y);
                    ctx.stroke();
                }
            }

            if (gridState === 2) {
                drawGridInfo(viewportWidth, viewportHeight, numColumns, gutterWidth, marginWidth, horizontalSpacing, isMobile);
            }
        }

        // Draw grid information on the canvas
        function drawGridInfo(viewportWidth, viewportHeight, numColumns, gutterWidth, marginWidth, horizontalSpacing, isMobile) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(viewportWidth - 220, 10, 210, 130);

            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText(`Columns: ${numColumns}`, viewportWidth - 210, 30);
            ctx.fillText(`Gutter Width: ${gutterWidth}px`, viewportWidth - 210, 50);
            ctx.fillText(`Margin Width: ${marginWidth}px`, viewportWidth - 210, 70);
            ctx.fillText(`Horizontal Spacing: ${horizontalSpacing}px`, viewportWidth - 210, 90);
            ctx.fillText(`Breakpoint: ${settings.breakpoint}px`, viewportWidth - 210, 110);
            ctx.fillText(`Viewport: ${isMobile ? 'Mobile' : 'Desktop'}`, viewportWidth - 210, 130);
        }

        // Toggle the grid display state
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

        // Toggle the display of horizontal lines
        function toggleHorizontalLines() {
            showHorizontalLines = !showHorizontalLines;
            if (gridState === 1 || gridState === 2) {
                drawGrid();
            }
        }

        // Event listeners for key presses and window resize
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.key === 'g') {
                event.preventDefault();
                toggleGrid();
            } else if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                toggleHorizontalLines();
            }
        });

        window.addEventListener('resize', function() {
            if (gridState === 1 || gridState === 2) {
                drawGrid();
            }
        });
