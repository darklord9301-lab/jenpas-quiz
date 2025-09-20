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
                <div class="exam-subtitle">Built for Urmi, exclusively by Adi !</div>
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
    const durationHours = Math.floor(examConfig.examDuration / 3600);
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
 * Shows exam instructions - placeholder for future implementation
 */
function showInstructions() {
    console.log('Showing instructions...');
    // TODO: Implement instructions modal
    alert('Instructions modal will be implemented in the next phase.');
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
