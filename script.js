/**
 * Online Exam Portal - Landing Page Script
 * Dynamically loads exam configuration and renders professional start page
 */

// Global variables to store exam configuration
let examConfig = null;
let themeColors = null;

/**
 * Main initialization function - loads config and renders the landing page
 */
async function initializeExamPortal() {
    try {
        // Show loading state
        showLoadingState();
        
        // Load configuration from JSON file
        await loadExamConfiguration();
        
        // Render the complete landing page
        renderLandingPage();
        
        // Apply dynamic theme colors
        applyThemeColors();
        
    } catch (error) {
        console.error('Failed to initialize exam portal:', error);
        showErrorState('Failed to load exam configuration. Please refresh the page.');
    }
}

/**
 * Fetches and parses the settings.json configuration file
 */
async function loadExamConfiguration() {
    try {
        const response = await fetch('config/settings.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        examConfig = await response.json();
        themeColors = examConfig.theme;
        
        console.log('Exam configuration loaded successfully:', examConfig);
        
    } catch (error) {
        throw new Error(`Configuration loading failed: ${error.message}`);
    }
}

/**
 * Renders the complete landing page with all sections
 */
function renderLandingPage() {
    const appContainer = document.getElementById('app');
    
    if (!appContainer) {
        throw new Error('App container not found');
    }
    
    // Build the complete landing page HTML
    const landingPageHTML = `
        <div class="exam-portal-container">
            ${renderHeader()}
            ${renderExamDetails()}
            ${renderSectionBreakdown()}
            ${renderActionButtons()}
        </div>
    `;
    
    appContainer.innerHTML = landingPageHTML;
}

/**
 * Renders the exam header with title and branding
 */
function renderHeader() {
    return `
        <header class="exam-header">
            <div class="header-content">
                <h1 class="exam-title" id="examTitle">${examConfig.examTitle}</h1>
                <div class="exam-subtitle">Built with love, exclusively for my Urmi!</div>
            </div>
        </header>
    `;
}

/**
 * Renders exam details section with key information
 */
function renderExamDetails() {
    // Format date for better display
    const formattedDate = formatExamDate(examConfig.examDate);
    const durationHours = Math.floor(examConfig.examDuration / 60);
    const durationMinutes = examConfig.examDuration % 60;
    const durationText = durationHours > 0 
        ? `${durationHours}h ${durationMinutes}m` 
        : `${durationMinutes} minutes`;
    
    return `
        <section class="exam-details">
            <div class="details-container">
                <h2 class="section-title">Exam Information</h2>
                <div class="details-grid">
                    <div class="detail-item">
                        <div class="detail-icon">📅</div>
                        <div class="detail-content">
                            <span class="detail-label">Date</span>
                            <span class="detail-value">${formattedDate}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">⏱️</div>
                        <div class="detail-content">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">${durationText}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">❓</div>
                        <div class="detail-content">
                            <span class="detail-label">Total Questions</span>
                            <span class="detail-value">${examConfig.pattern.totalQuestions}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">🏆</div>
                        <div class="detail-content">
                            <span class="detail-label">Total Marks</span>
                            <span class="detail-value">${examConfig.pattern.totalMarks}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * Renders the section breakdown table with question categories and marks
 */
function renderSectionBreakdown() {
    const sections = examConfig.pattern.sections;
    
    // Generate table rows for each section
    const sectionRows = sections.map(section => `
        <tr class="section-row">
            <td class="section-name">${section.name}</td>
            <td class="section-category">${section.categoryI || '-'}</td>
            <td class="section-category">${section.categoryII || '-'}</td>
            <td class="section-marks">${section.marks}</td>
        </tr>
    `).join('');
    
    return `
        <section class="section-breakdown">
            <div class="breakdown-container">
                <h2 class="section-title">Exam Pattern</h2>
                <div class="table-container">
                    <table class="sections-table">
                        <thead>
                            <tr class="table-header">
                                <th>Section</th>
                                <th>Category I </th>
                                <th>Category II </th>
                                <th>Total Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sectionRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;
}

/**
 * Renders action buttons section
 */
function renderActionButtons() {
    return `
        <section class="action-section">
            <div class="button-container">
                <button class="btn-primary start-exam-btn" onclick="startExam()">
                    <span class="btn-icon">🚀</span>
                    Start Exam
                </button>
                <button class="btn-secondary instructions-btn" onclick="showInstructions()">
                    <span class="btn-icon">📋</span>
                    Instructions
                </button>
            </div>
        </section>
    `;
}

/**
 * Applies dynamic theme colors from configuration
 */
function applyThemeColors() {
    const root = document.documentElement;
    
    // Set CSS custom properties for theme colors
    root.style.setProperty('--primary-color', themeColors.primaryColor);
    root.style.setProperty('--attempted-color', themeColors.attemptedColor);
    root.style.setProperty('--unattempted-color', themeColors.unattemptedColor);
    root.style.setProperty('--review-color', themeColors.reviewColor);
    
    // Apply primary color to specific elements
    const primaryElements = document.querySelectorAll('#examTitle, .table-header');
    primaryElements.forEach(element => {
        element.style.color = themeColors.primaryColor;
    });
    
    // Apply border colors to table
    const table = document.querySelector('.sections-table');
    if (table) {
        table.style.borderColor = themeColors.primaryColor;
    }
}

/**
 * Utility function to format exam date
 */
function formatExamDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString; // Return original string if parsing fails
    }
}

/**
 * Shows loading state while configuration is being fetched
 */
function showLoadingState() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading exam configuration...</p>
        </div>
    `;
}

/**
 * Shows error state if configuration loading fails
 */
function showErrorState(message) {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <h2 class="error-title">Configuration Error</h2>
            <p class="error-message">${message}</p>
            <button class="btn-secondary" onclick="location.reload()">Retry</button>
        </div>
    `;
}

/**
 * Handles start exam button click - placeholder for future implementation
 */
function startExam() {
    // Show confirmation dialog
    const confirmed = confirm('Are you ready to start the exam? Once started, the timer will begin.');
    
    if (confirmed) {
        console.log('Starting exam...');
        // TODO: Implement exam start logic
        alert('Exam functionality will be implemented in the next phase.');
    }
}

/**
 * Shows exam instructions in a professional modal
 */
function showInstructions() {
    console.log('Showing instructions...');
    
    // Create modal HTML with comprehensive instructions
    const modalHTML = `
        <div class="modal-overlay" id="instructionsModal" onclick="closeInstructions(event)">
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="modal-title">Exam Instructions</h2>
                    <button class="modal-close-btn" onclick="closeInstructions()">&times;</button>
                </div>
                <div class="modal-content">
                    ${generateInstructionsContent()}
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="closeInstructions()">
                        <span class="btn-icon">✓</span>
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles dynamically
    addModalStyles();
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

/**
 * Generates comprehensive instructions content based on exam configuration
 */
function generateInstructionsContent() {
    const durationHours = Math.floor(examConfig.examDuration / 3600);
    const durationMinutes = Math.floor((examConfig.examDuration % 3600) / 60);
    const durationText = durationHours > 0 
        ? `${durationHours} hour${durationHours > 1 ? 's' : ''} and ${durationMinutes} minute${durationMinutes > 1 ? 's' : ''}` 
        : `${durationMinutes} minute${durationMinutes > 1 ? 's' : ''}`;
    
    return `
        <div class="instructions-content">
            <div class="instruction-section">
                <h3 class="instruction-heading">📋 General Instructions</h3>
                <ul class="instruction-list">
                    <li>This exam contains <strong>${examConfig.pattern.totalQuestions} questions</strong> for a total of <strong>${examConfig.pattern.totalMarks} marks</strong></li>
                    <li>Total duration: <strong>${durationText}</strong></li>
                    <li>Once you start the exam, the timer will begin automatically</li>
                    <li>You can navigate between questions using the question palette</li>
                    <li>${examConfig.autoSubmit ? 'The exam will auto-submit when time expires' : 'Manual submission is required before time expires'}</li>
                    <li>Maximum page reloads allowed: <strong>${examConfig.maxReloads}</strong></li>
                    <li>Grace time for technical issues: <strong>${examConfig.graceTime} seconds</strong></li>
                </ul>
            </div>

            <div class="instruction-section">
                <h3 class="instruction-heading">📚 Section-wise Breakdown</h3>
                <div class="sections-info">
                    ${examConfig.pattern.sections.map(section => `
                        <div class="section-info">
                            <strong>${section.name}:</strong> 
                            ${section.categoryI} Category I questions${section.categoryII > 0 ? ` + ${section.categoryII} Category II questions` : ''} 
                            = <strong>${section.marks} marks</strong>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="instruction-section">
                <h3 class="instruction-heading">🎯 Marking Scheme</h3>
                <div class="marking-info">
                    <div class="category-marking">
                        <strong>Category I Questions:</strong>
                        <ul class="marking-list">
                            <li>Correct Answer: <span class="positive-mark">+${examConfig.pattern.markingScheme.categoryI.correct} mark</span></li>
                            <li>Wrong Answer: <span class="negative-mark">${examConfig.pattern.markingScheme.categoryI.wrong} marks</span></li>
                            <li>Unanswered: <span class="neutral-mark">${examConfig.pattern.markingScheme.categoryI.unanswered} marks</span></li>
                        </ul>
                    </div>
                    <div class="category-marking">
                        <strong>Category II Questions:</strong>
                        <ul class="marking-list">
                            <li>Correct Answer: <span class="positive-mark">+${examConfig.pattern.markingScheme.categoryII.correct} marks</span></li>
                            <li>Wrong Answer: <span class="negative-mark">${examConfig.pattern.markingScheme.categoryII.wrong} marks</span></li>
                            <li>Unanswered: <span class="neutral-mark">${examConfig.pattern.markingScheme.categoryII.unanswered} marks</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="instruction-section">
                <h3 class="instruction-heading">🎨 Question Status Colors</h3>
                <div class="color-legend">
                    <div class="color-item">
                        <span class="color-box attempted-color"></span>
                        <span>Attempted Questions</span>
                    </div>
                    <div class="color-item">
                        <span class="color-box unattempted-color"></span>
                        <span>Unattempted Questions</span>
                    </div>
                    <div class="color-item">
                        <span class="color-box review-color"></span>
                        <span>Questions Marked for Review</span>
                    </div>
                </div>
            </div>

            <div class="instruction-section">
                <h3 class="instruction-heading">⚠️ Important Guidelines</h3>
                <ul class="instruction-list warning-list">
                    <li>Ensure stable internet connection throughout the exam</li>
                    <li>Do not close the browser or refresh the page unnecessarily</li>
                    <li>Use only one browser tab for the exam</li>
                    <li>Keep your system charged or connected to power</li>
                    <li>${examConfig.allowReview ? 'You can review your answers before final submission' : 'Review of answers is not allowed'}</li>
                    <li>Results will ${examConfig.showResultsImmediately ? 'be shown immediately after submission' : 'be available later'}</li>
                </ul>
            </div>

            <div class="instruction-section good-luck">
                <h3 class="instruction-heading">🍀 Best of Luck!</h3>
                <p>Read each question carefully and manage your time wisely. Remember, there's negative marking for Category I questions, so answer only when you're confident.</p>
            </div>
        </div>
    `;
}

/**
 * Closes the instructions modal
 */
function closeInstructions(event) {
    // If clicked on overlay (not on modal content), close modal
    if (event && event.target.id !== 'instructionsModal') return;
    
    const modal = document.getElementById('instructionsModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto'; // Restore body scroll
    }
}

/**
 * Adds dynamic styles for the instructions modal
 */
function addModalStyles() {
    // Check if styles already exist
    if (document.getElementById('modalStyles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modalStyles';
    styles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(2px);
        }
        
        .modal-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            max-width: 800px;
            max-height: 90vh;
            width: 90%;
            overflow: hidden;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-header {
            background: var(--primary-color, #2c3e50);
            color: white;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-title {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
        }
        
        .modal-close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background 0.3s;
        }
        
        .modal-close-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .modal-content {
            padding: 30px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .modal-footer {
            background: #f8f9fa;
            padding: 20px 30px;
            border-top: 1px solid #e9ecef;
            text-align: center;
        }
        
        .instructions-content {
            line-height: 1.6;
        }
        
        .instruction-section {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .instruction-section:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .instruction-heading {
            color: var(--primary-color, #2c3e50);
            margin-bottom: 15px;
            font-size: 1.2em;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .instruction-list {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .instruction-list li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .sections-info {
            display: grid;
            gap: 10px;
            margin: 15px 0;
        }
        
        .section-info {
            background: #f8f9fa;
            padding: 12px 15px;
            border-radius: 6px;
            border-left: 4px solid var(--primary-color, #2c3e50);
        }
        
        .marking-info {
            display: grid;
            gap: 20px;
            margin-top: 15px;
        }
        
        .category-marking {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }
        
        .marking-list {
            margin-top: 10px;
            padding-left: 20px;
        }
        
        .positive-mark {
            color: #28a745;
            font-weight: 600;
        }
        
        .negative-mark {
            color: #dc3545;
            font-weight: 600;
        }
        
        .neutral-mark {
            color: #6c757d;
            font-weight: 600;
        }
        
        .color-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 15px;
        }
        
        .color-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .color-box {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            border: 2px solid #ddd;
        }
        
        .attempted-color {
            background-color: var(--attempted-color, #2ecc71);
        }
        
        .unattempted-color {
            background-color: var(--unattempted-color, #e74c3c);
        }
        
        .review-color {
            background-color: var(--review-color, #f39c12);
        }
        
        .warning-list li {
            color: #856404;
        }
        
        .good-luck {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        
        .good-luck p {
            margin: 10px 0 0 0;
            font-style: italic;
            color: #495057;
        }
        
        @media (max-width: 768px) {
            .modal-container {
                width: 95%;
                max-height: 95vh;
            }
            
            .modal-header, .modal-content, .modal-footer {
                padding: 15px 20px;
            }
            
            .color-legend {
                flex-direction: column;
                gap: 10px;
            }
            
            .marking-info {
                gap: 15px;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

/**
 * Responsive design handler for mobile optimization
 */
function handleResponsiveDesign() {
    const isMobile = window.innerWidth <= 768;
    const appContainer = document.getElementById('app');
    
    if (isMobile) {
        appContainer.classList.add('mobile-view');
    } else {
        appContainer.classList.remove('mobile-view');
    }
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the exam portal when DOM is loaded
    initializeExamPortal();
    
    // Handle responsive design on window resize
    window.addEventListener('resize', handleResponsiveDesign);
    
    // Initial responsive design setup
    handleResponsiveDesign();
});

// Export functions for potential module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeExamPortal,
        loadExamConfiguration,
        startExam,
        showInstructions
    };
}
