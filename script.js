/* Enhanced Controls */
        question-controls .btn-outline:hover:not(:disabled) {
            background: var(--primary-color, #2c3e50);
            color: white;
            box-shadow: 0 8px 20px rgba(44, 62, 80, 0.3);
        }
        
        .submit-btn {
            background: linear-gradient(135deg, #dc3545 0%, #c82333 100%) !important;
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3) !important;
        }
        
        .submit-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #c82333 0%, #bd2130 100%) !important;
            box-shadow: 0 8px 20px rgba(220, 53, 69, 0.45) !important;
        }
        
        /* Submission States */
        .submission-container,
        .submission-success {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
        }
        
        .submission-container::before,
        .submission-success::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: backgroundFloat 10s ease-in-out infinite;
        }
        
        @keyframes backgroundFloat {
            0%, 100% { transform: translate(-25%, -25%); }
            50% { transform: translate(-35%, -35%); }
        }
        
        .submission-content,
        .success-content {
            text-align: center;
            background: white;
            padding: 60px;
            border-radius: 20px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.3);
            max-width: 550px;
            width: 90%;
            position: relative;
            z-index: 1;
        }
        
        .loading-spinner.large {
            width: 80px;
            height: 80px;
            margin: 0 auto 35px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid var(--primary-color, #2c3e50);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .submission-title,
        .success-title {
            color: var(--primary-color, #2c3e50);
            margin-bottom: 24px;
            font-size: 2em;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        
        .submission-text,
        .success-text {
            color: #4a5568;
            margin-bottom: 35px;
            line-height: 1.7;
            font-size: 1.1em;
        }
        
        .success-subtext {
            color: #718096;
            font-size: 0.95em;
            margin-bottom: 40px;
            line-height: 1.6;
        }
        
        .submission-progress {
            margin-top: 35px;
        }
        
        .progress-bar {
            background: #e9ecef;
            border-radius: 12px;
            overflow: hidden;
            height: 12px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .progress-fill {
            background: linear-gradient(90deg, var(--primary-color, #2c3e50) 0%, var(--attempted-color, #2ecc71) 100%);
            height: 100%;
            width: 0%;
            animation: progressFill 2s ease-out forwards;
            border-radius: 12px;
            position: relative;
            overflow: hidden;
        }
        
        .progress-fill::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: progressShimmer 1.5s infinite;
        }
        
        @keyframes progressFill {
            to { width: 100%; }
        }
        
        @keyframes progressShimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        
        .success-icon {
            font-size: 5em;
            margin-bottom: 30px;
            animation: successBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            filter: drop-shadow(0 4px 12px rgba(46, 204, 113, 0.3));
        }
        
        @keyframes successBounce {
            0% { 
                transform: scale(0) rotate(-180deg);
                opacity: 0;
            }
            50% { transform: scale(1.2) rotate(10deg); }
            100% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }
        
        .success-actions {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .success-actions button {
            min-width: 180px;
        }
        
        /* Scrollbar Styling */
        .palette-sections::-webkit-scrollbar {
            width: 8px;
        }
        
        .palette-sections::-webkit-scrollbar-track {
            background: #f1f3f5;
            border-radius: 10px;
            margin: 10px 0;
        }
        
        .palette-sections::-webkit-scrollbar-thumb {
            background: var(--primary-color, #2c3e50);
            border-radius: 10px;
        }
        
        .palette-sections::-webkit-scrollbar-thumb:hover {
            background: #34495e;
        }
        
        /* Stats Enhancement */
        .stats-item {
            display: flex;
            align-items: center;
            gap: 6px;
            background: #f8f9fa;
            padding: 10px 16px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            transition: all 0.3s ease;
        }
        
        .stats-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            border-color: var(--primary-color, #2c3e50);
        }
        
        /* Category Badge Enhancement */
        .category-badge {
            font-size: 0.75em;
            padding: 5px 10px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .category-badge:hover {
            transform: scale(1.05);
        }
        
        .cat-1 {
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
            color: #1565c0;
            border: 1px solid #90caf9;
        }
        
        .cat-2 {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            color: #7b1fa2;
            border: 1px solid #ce93d8;
        }
        
        /* Marks Badge Enhancement */
        .marks-positive {
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            color: #155724;
            padding: 8px 14px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.9em;
            border: 1px solid #c3e6cb;
            box-shadow: 0 2px 6px rgba(21, 87, 36, 0.15);
        }
        
        .marks-negative {
            background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
            color: #721c24;
            padding: 8px 14px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.9em;
            border: 1px solid #f5c6cb;
            box-shadow: 0 2px 6px rgba(114, 28, 36, 0.15);
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
            .exam-header-content {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            
            .exam-stats {
                order: -1;
            }
            
            .exam-body {
                flex-direction: column;
                padding: 15px;
                gap: 20px;
            }
            
            .question-palette {
                width: 100%;
                order: 2;
                max-height: 450px;
            }
            
            .palette-sections {
                max-height: 350px;
            }
            
            .section-palette-grid {
                grid-template-columns: repeat(8, 1fr);
            }
            
            .palette-item {
                width: 38px;
                height: 38px;
                font-size: 0.9em;
            }
            
            .question-panel {
                order: 1;
            }
            
            .question-content {
                padding: 30px;
            }
            
            .question-controls {
                padding: 24px 30px;
                flex-direction: column;
                gap: 15px;
            }
            
            .control-group-left,
            .control-group-center,
            .control-group-right {
                width: 100%;
                justify-content: center;
            }
            
            .question-controls button {
                flex: 1;
                min-width: 140px;
            }
            
            .question-meta {
                flex-direction: column;
                align-items: stretch;
                gap: 14px;
            }
            
            .question-info {
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .question-marks {
                justify-content: center;
            }
        }
        
        @media (max-width: 768px) {
            .exam-header-bar {
                padding: 16px 20px;
            }
            
            .exam-title-small {
                font-size: 1.3em;
            }
            
            .timer-container {
                padding: 12px 20px;
            }
            
            .timer {
                font-size: 1.2em;
                padding: 8px 16px;
            }
            
            .exam-body {
                padding: 12px;
                gap: 16px;
            }
            
            .question-palette {
                max-height: 350px;
                width: 100%;
            }
            
            .palette-header,
            .section-palette {
                padding: 18px 22px;
            }
            
            .section-palette-grid {
                grid-template-columns: repeat(7, 1fr);
                gap: 8px;
            }
            
            .palette-item {
                width: 36px;
                height: 36px;
                font-size: 0.85em;
            }
            
            .question-content {
                padding: 24px;
            }
            
            .question-text {
                font-size: 1.15em;
            }
            
            .option-label {
                padding: 18px;
                gap: 14px;
            }
            
            .option-marker {
                width: 32px;
                height: 32px;
                font-size: 0.9em;
            }
            
            .question-controls {
                padding: 20px 24px;
            }
            
            .question-controls button {
                padding: 14px 22px;
            }
            
            .modal-container {
                width: 95%;
                max-height: 95vh;
            }
            
            .modal-header,
            .modal-content,
            .modal-footer {
                padding: 18px 22px;
            }
            
            .submission-content,
            .success-content {
                padding: 40px 24px;
            }
            
            .loading-spinner.large {
                width: 70px;
                height: 70px;
            }
        }
        
        /* Accessibility Improvements */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
            .palette-item,
            .option-label,
            .question-controls button {
                border-width: 3px;
            }
            
            .timer {
                border-width: 3px;
            }
        }
        
        /* Focus styles for keyboard navigation */
        .palette-item:focus,
        .question-controls button:focus,
        .option-label:focus-within {
            outline: 4px solid var(--primary-color, #2c3e50);
            outline-offset: 3px;
        }
        
        /* Print styles */
        @media print {
            .exam-interface {
                background: white;
            }
            
            .question-palette,
            .question-controls {
                display: none;
            }
            
            .question-panel {
                box-shadow: none;
                border: 1px solid #ccc;
            }
        }
    `;
    
    document.head.appendChild(styles);
}question-controls {
            background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
            padding: 28px 40px;
            border-top: 1px solid #e1e4e8;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.04);
        }
        
        .control-group-left,
        .control-group-center,
        .control-group-right {
            display: flex;
            gap: 14px;
            align-items: center;
        }
        
        .question-controls .btn-primary,
        .question-controls .btn-secondary,
        .question-controls .btn-outline {
            padding: 16px 28px;
            border-radius: 10px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
            font-size: 0.95em;
            letter-spacing: 0.3px;
            position: relative;
            overflow: hidden;
        }
        
        .question-controls button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255,255,255,0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s ease, height 0.6s ease;
        }
        
        .question-controls button:active::before {
            width: 300px;
            height: 300px;
        }
        
        .question-controls .btn-primary {
            background: linear-gradient(135deg, var(--primary-color, #2c3e50) 0%, #34495e 100%);
            color: white;
            box-shadow: 0 4px 12px rgba(44, 62, 80, 0.25);
        }
        
        .question-controls .btn-secondary {
            background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
            color: white;
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.25);
        }
        
        .question-controls .btn-outline {
            background: white;
            color: var(--primary-color, #2c3e50);
            border: 2px solid var(--primary-color, #2c3e50);
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        
        .question-controls .btn-outline.marked {
            background: linear-gradient(135deg, var(--review-color, #f39c12) 0%, #e67e22 100%);
            color: white;
            border-color: var(--review-color, #f39c12);
            box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
        }
        
        .question-controls button:disabled {
            opacity: 0.4;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: none !important;
        }
        
        .question-controls button:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.25);
        }
        
        .question-controls .btn-primary:hover:not(:disabled) {
            background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
            box-shadow: 0 8px 20px rgba(44, 62, 80, 0.35);
        }
        
        .question-controls .btn-secondary:hover:not(:disabled) {
            background: linear-gradient(135deg, #5a6268 0%, #6c757d 100%);
            box-shadow: 0 8px 20px rgba(108, 117, 125, 0.35);
        }
        
        ./**
 * Online Exam Portal - Complete Exam Engine
 * Landing page + Full exam interface with logging and email submission
 */

// Global variables
let examConfig = null;
let themeColors = null;
let questions = null;
let examLog = null;
let currentQuestionIndex = 0;
let examTimer = null;
let examStartTime = null;
let questionStartTime = null;
let isExamStarted = false;

/**
 * Main initialization function - loads config and renders the landing page
 */
async function initializeExamPortal() {
    try {
        showLoadingState();
        await loadExamConfiguration();
        await loadQuestions();
        renderLandingPage();
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
 * Fetches and parses the questions.json file
 */
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        questions = data.questions;
        console.log(`Loaded ${questions.length} questions successfully`);
    } catch (error) {
        throw new Error(`Questions loading failed: ${error.message}`);
    }
}

/**
 * Initializes the exam log structure
 */
function initializeExamLog() {
    examLog = {
        examTitle: examConfig.examTitle,
        startTime: new Date().toISOString(),
        endTime: null,
        totalTimeTaken: null,
        responses: questions.map(q => ({
            questionId: q.id,
            selectedOption: null,
            markedForReview: false,
            timeSpent: 0,
            actions: []
        }))
    };
}

/**
 * Updates the exam log with user actions
 */
function updateLog(questionId, action, selectedOption = null) {
    const response = examLog.responses.find(r => r.questionId === questionId);
    if (!response) return;

    // Update time spent on previous question
    if (questionStartTime && action === 'viewed') {
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
        if (currentQuestionIndex > 0) {
            const prevResponse = examLog.responses.find(r => r.questionId === questions[currentQuestionIndex - 1]?.id);
            if (prevResponse) {
                prevResponse.timeSpent += timeSpent;
            }
        }
        questionStartTime = Date.now();
    }

    // Add action to log
    response.actions.push({
        event: action,
        timestamp: new Date().toISOString()
    });

    // Update selected option if provided
    if (selectedOption !== null) {
        response.selectedOption = selectedOption;
    }

    console.log(`Log updated: Q${questionId} - ${action}`, response);
}

/**
 * Gets question statistics by section
 */
function getQuestionStatsBySection() {
    const stats = {};
    const sections = examConfig.pattern.sections;
    
    sections.forEach(section => {
        stats[section.name] = {
            name: section.name,
            categoryI: section.categoryI || 0,
            categoryII: section.categoryII || 0,
            attempted: 0,
            unattempted: 0,
            review: 0,
            questions: []
        };
    });
    
    questions.forEach((q, index) => {
        const response = examLog.responses.find(r => r.questionId === q.id);
        const section = stats[q.section];
        
        if (section) {
            section.questions.push({ ...q, index, response });
            
            if (response?.markedForReview) {
                section.review++;
            } else if (response?.selectedOption !== null) {
                section.attempted++;
            } else {
                section.unattempted++;
            }
        }
    });
    
    return stats;
}

/**
 * Renders the complete landing page with all sections
 */
function renderLandingPage() {
    const appContainer = document.getElementById('app');
    
    if (!appContainer) {
        throw new Error('App container not found');
    }
    
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
    const formattedDate = formatExamDate(examConfig.examDate);
    const totalDuration = examConfig.examDuration + (examConfig.graceTime || 0);
    const durationHours = Math.floor(totalDuration / 3600);
    const durationMinutes = Math.floor((totalDuration % 3600) / 60);
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
 * Renders the section breakdown table
 */
function renderSectionBreakdown() {
    const sections = examConfig.pattern.sections;
    
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
                                <th>Category I</th>
                                <th>Category II</th>
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
 * Renders the complete exam interface
 */
function renderExamInterface() {
    const appContainer = document.getElementById('app');
    
    const examHTML = `
        <div class="exam-interface">
            ${renderExamHeader()}
            <div class="exam-body">
                ${renderQuestionPalette()}
                ${renderQuestionPanel()}
            </div>
        </div>
    `;
    
    appContainer.innerHTML = examHTML;
    
    // Render the first question
    renderQuestion(0);
    
    // Start MathJax rendering if available
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

/**
 * Renders the exam header with timer
 */
function renderExamHeader() {
    return `
        <header class="exam-header-bar">
            <div class="exam-header-content">
                <h2 class="exam-title-small">${examConfig.examTitle}</h2>
                <div class="exam-stats">
                    <div class="stats-item">
                        <span class="stats-label">Questions:</span>
                        <span class="stats-value">${examConfig.pattern.totalQuestions}</span>
                    </div>
                    <div class="stats-item">
                        <span class="stats-label">Marks:</span>
                        <span class="stats-value">${examConfig.pattern.totalMarks}</span>
                    </div>
                </div>
                <div class="timer-container">
                    <span class="timer-label">Time Remaining:</span>
                    <span class="timer" id="examTimer">00:00:00</span>
                </div>
            </div>
        </header>
    `;
}

/**
 * Renders the enhanced question palette with sections
 */
function renderQuestionPalette() {
    const sectionStats = getQuestionStatsBySection();
    
    const sectionPalettes = Object.values(sectionStats).map(section => {
        const sectionQuestions = section.questions.map(q => {
            let status = 'unattempted';
            
            if (q.response) {
                if (q.response.markedForReview) {
                    status = 'review';
                } else if (q.response.selectedOption !== null) {
                    status = 'attempted';
                }
            }
            
            return `
                <button class="palette-item ${status} ${q.index === currentQuestionIndex ? 'current' : ''}" 
                        onclick="navigateToQuestion(${q.index})" 
                        data-question-id="${q.id}"
                        title="${section.name} - ${q.category} (${q.marks} marks)">
                    ${q.index + 1}
                </button>
            `;
        }).join('');
        
        return `
            <div class="section-palette">
                <div class="section-palette-header">
                    <h4 class="section-palette-title">${section.name}</h4>
                    <div class="section-categories">
                        ${section.categoryI > 0 ? `<span class="category-badge cat-1">Cat I: ${section.categoryI}</span>` : ''}
                        ${section.categoryII > 0 ? `<span class="category-badge cat-2">Cat II: ${section.categoryII}</span>` : ''}
                    </div>
                    <div class="section-stats">
                        <span class="stat-item attempted-stat" title="Attempted">${section.attempted}</span>
                        <span class="stat-item review-stat" title="Marked for Review">${section.review}</span>
                        <span class="stat-item unattempted-stat" title="Unattempted">${section.unattempted}</span>
                    </div>
                </div>
                <div class="section-palette-grid">
                    ${sectionQuestions}
                </div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="question-palette">
            <div class="palette-header">
                <h3 class="palette-title">Question Navigation</h3>
                <div class="legend">
                    <div class="legend-item">
                        <span class="legend-color attempted"></span>
                        <span>Attempted</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color unattempted"></span>
                        <span>Unattempted</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color review"></span>
                        <span>Review</span>
                    </div>
                </div>
            </div>
            <div class="palette-sections">
                ${sectionPalettes}
            </div>
        </div>
    `;
}

/**
 * Renders the question panel
 */
function renderQuestionPanel() {
    return `
        <div class="question-panel">
            <div class="question-content" id="questionContent">
                <!-- Question will be rendered here -->
            </div>
            <div class="question-controls">
                <div class="control-group-left">
                    <button class="btn-secondary" onclick="previousQuestion()" id="prevBtn">
                        <span class="btn-icon">←</span>
                        Previous
                    </button>
                    <button class="btn-outline" onclick="clearSelection()" id="clearBtn">
                        <span class="btn-icon">✗</span>
                        Clear Response
                    </button>
                </div>
                <div class="control-group-center">
                    <button class="btn-outline" onclick="toggleReview()" id="reviewBtn">
                        <span class="btn-icon">🔖</span>
                        Mark for Review
                    </button>
                </div>
                <div class="control-group-right">
                    <button class="btn-secondary" onclick="nextQuestion()" id="nextBtn">
                        Next
                        <span class="btn-icon">→</span>
                    </button>
                    <button class="btn-primary submit-btn" onclick="submitExam()">
                        <span class="btn-icon">📤</span>
                        Submit Exam
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Renders a specific question
 */
function renderQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    currentQuestionIndex = index;
    const question = questions[index];
    const response = examLog.responses.find(r => r.questionId === question.id);
    
    // Update log for question view
    updateLog(question.id, 'viewed');
    
    const questionHTML = `
        <div class="question-header">
            <div class="question-meta">
                <div class="question-number-badge">
                    <span class="question-number">Question ${index + 1}</span>
                    <span class="question-total">of ${questions.length}</span>
                </div>
                <div class="question-info">
                    <span class="question-section">${question.section}</span>
                    <span class="question-category">Category ${question.category}</span>
                </div>
                <div class="question-marks">
                    <span class="marks-positive">+${question.marks}</span>
                    ${question.negativeMarks ? `<span class="marks-negative">${question.negativeMarks}</span>` : ''}
                </div>
            </div>
        </div>
        
        <div class="question-text">
            ${question.questionText}
        </div>
        
        <div class="options-container">
            ${question.options.map((option, optIndex) => `
                <label class="option-label ${response?.selectedOption === optIndex ? 'selected' : ''}">
                    <input type="radio" 
                           name="question_${question.id}" 
                           value="${optIndex}"
                           ${response?.selectedOption === optIndex ? 'checked' : ''}
                           onchange="selectOption(${question.id}, ${optIndex})">
                    <span class="option-marker">${String.fromCharCode(65 + optIndex)}</span>
                    <span class="option-text">${option}</span>
                </label>
            `).join('')}
        </div>
    `;
    
    document.getElementById('questionContent').innerHTML = questionHTML;
    
    // Update palette
    updateQuestionPalette();
    
    // Update button states
    updateControlButtons();
    
    // Render MathJax if available
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('questionContent')]);
    }
}

/**
 * Updates the question palette colors
 */
function updateQuestionPalette() {
    questions.forEach((q, index) => {
        const paletteItem = document.querySelector(`[data-question-id="${q.id}"]`);
        const response = examLog.responses.find(r => r.questionId === q.id);
        
        if (paletteItem) {
            paletteItem.className = 'palette-item';
            
            if (response.markedForReview) {
                paletteItem.classList.add('review');
            } else if (response.selectedOption !== null) {
                paletteItem.classList.add('attempted');
            } else {
                paletteItem.classList.add('unattempted');
            }
            
            if (index === currentQuestionIndex) {
                paletteItem.classList.add('current');
            }
        }
    });
    
    // Update section stats
    updateSectionStats();
}

/**
 * Updates section statistics in the palette
 */
function updateSectionStats() {
    const sectionStats = getQuestionStatsBySection();
    
    Object.values(sectionStats).forEach(section => {
        const sectionElement = document.querySelector(`[data-section="${section.name}"]`);
        if (sectionElement) {
            const attemptedStat = sectionElement.querySelector('.attempted-stat');
            const reviewStat = sectionElement.querySelector('.review-stat');
            const unattemptedStat = sectionElement.querySelector('.unattempted-stat');
            
            if (attemptedStat) attemptedStat.textContent = section.attempted;
            if (reviewStat) reviewStat.textContent = section.review;
            if (unattemptedStat) unattemptedStat.textContent = section.unattempted;
        }
    });
}

/**
 * Updates control button states
 */
function updateControlButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const reviewBtn = document.getElementById('reviewBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Next button
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;
    
    // Review button
    const response = examLog.responses.find(r => r.questionId === questions[currentQuestionIndex].id);
    if (response?.markedForReview) {
        reviewBtn.innerHTML = '<span class="btn-icon">🔖</span> Remove Review';
        reviewBtn.classList.add('marked');
    } else {
        reviewBtn.innerHTML = '<span class="btn-icon">🔖</span> Mark for Review';
        reviewBtn.classList.remove('marked');
    }
    
    // Clear button
    clearBtn.disabled = response?.selectedOption === null;
}

/**
 * Starts the exam
 */
function startExam() {
    const confirmed = confirm(`Are you ready to start the exam?\n\nOnce started:\n• Timer will begin immediately\n• You cannot pause or restart\n• Duration: ${Math.floor((examConfig.examDuration + examConfig.graceTime) / 60)} minutes\n\nClick OK to begin.`);
    
    if (confirmed) {
        isExamStarted = true;
        examStartTime = Date.now();
        questionStartTime = Date.now();
        
        // Initialize exam log
        initializeExamLog();
        
        // Render exam interface
        renderExamInterface();
        
        // Start timer
        startTimer();
        
        console.log('Exam started at:', new Date().toISOString());
    }
}

/**
 * Starts the exam timer
 */
function startTimer() {
    const totalTime = (examConfig.examDuration + (examConfig.graceTime || 0)) * 1000;
    const endTime = Date.now() + totalTime;
    
    examTimer = setInterval(() => {
        const remainingTime = endTime - Date.now();
        
        if (remainingTime <= 0) {
            clearInterval(examTimer);
            submitExam(true); // Auto-submit
            return;
        }
        
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        const timerElement = document.getElementById('examTimer');
        if (timerElement) {
            timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Change color when less than 5 minutes remaining
            if (remainingTime < 5 * 60 * 1000) {
                timerElement.classList.add('warning');
            }
        }
    }, 1000);
}

/**
 * Navigates to a specific question
 */
function navigateToQuestion(index) {
    if (index >= 0 && index < questions.length) {
        renderQuestion(index);
    }
}

/**
 * Goes to previous question
 */
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        navigateToQuestion(currentQuestionIndex - 1);
    }
}

/**
 * Goes to next question
 */
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        navigateToQuestion(currentQuestionIndex + 1);
    }
}

/**
 * Handles option selection with deselection capability
 */
function selectOption(questionId, optionIndex) {
    const response = examLog.responses.find(r => r.questionId === questionId);
    
    // If the same option is clicked, deselect it
    if (response.selectedOption === optionIndex) {
        response.selectedOption = null;
        updateLog(questionId, 'deselected');
        
        // Uncheck the radio button
        const radioButton = document.querySelector(`input[name="question_${questionId}"][value="${optionIndex}"]`);
        if (radioButton) {
            radioButton.checked = false;
        }
        
        // Remove selected class from option
        const optionLabel = radioButton?.closest('.option-label');
        if (optionLabel) {
            optionLabel.classList.remove('selected');
        }
    } else {
        // Select the new option
        updateLog(questionId, 'answered', optionIndex);
        
        // Update visual selection
        const allOptions = document.querySelectorAll(`input[name="question_${questionId}"]`);
        allOptions.forEach(radio => {
            const label = radio.closest('.option-label');
            if (label) {
                label.classList.remove('selected');
            }
        });
        
        const selectedOption = document.querySelector(`input[name="question_${questionId}"][value="${optionIndex}"]`);
        const selectedLabel = selectedOption?.closest('.option-label');
        if (selectedLabel) {
            selectedLabel.classList.add('selected');
        }
    }
    
    updateQuestionPalette();
    updateControlButtons();
    console.log(`Option ${optionIndex} for question ${questionId}:`, response.selectedOption);
}

/**
 * Clears the selected option for current question
 */
function clearSelection() {
    const questionId = questions[currentQuestionIndex].id;
    const response = examLog.responses.find(r => r.questionId === questionId);
    
    if (response.selectedOption !== null) {
        response.selectedOption = null;
        updateLog(questionId, 'cleared');
        
        // Uncheck all radio buttons for current question
        const radioButtons = document.querySelectorAll(`input[name="question_${questionId}"]`);
        radioButtons.forEach(radio => {
            radio.checked = false;
            const label = radio.closest('.option-label');
            if (label) {
                label.classList.remove('selected');
            }
        });
        
        updateQuestionPalette();
        updateControlButtons();
    }
}

/**
 * Toggles review mark for current question
 */
function toggleReview() {
    const questionId = questions[currentQuestionIndex].id;
    const response = examLog.responses.find(r => r.questionId === questionId);
    
    response.markedForReview = !response.markedForReview;
    updateLog(questionId, response.markedForReview ? 'review-marked' : 'review-unmarked');
    
    updateQuestionPalette();
    updateControlButtons();
}

/**
 * Submits the exam
 */
function submitExam(auto = false) {
    const confirmed = auto || confirm(`Are you sure you want to submit the exam?\n\nThis action cannot be undone.`);
    
    if (confirmed) {
        // Stop timer
        if (examTimer) {
            clearInterval(examTimer);
        }
        
        // Show submission loading
        showSubmissionLoading();
        
        // Finalize exam log
        finalizeExamLog();
        
        // Simulate processing delay
        setTimeout(() => {
            openGmailCompose();
        }, 2000);
    }
}

/**
 * Shows submission loading state
 */
function showSubmissionLoading() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="submission-container">
            <div class="submission-content">
                <div class="loading-spinner large"></div>
                <h2 class="submission-title">Submitting your exam...</h2>
                <p class="submission-text">Please wait while we process your responses.</p>
                <div class="submission-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Finalizes the exam log with end time and total time
 */
function finalizeExamLog() {
    examLog.endTime = new Date().toISOString();
    examLog.totalTimeTaken = Math.floor((Date.now() - examStartTime) / 1000);
    
    // Update time spent on last question
    if (questionStartTime) {
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
        const lastResponse = examLog.responses.find(r => r.questionId === questions[currentQuestionIndex]?.id);
        if (lastResponse) {
            lastResponse.timeSpent += timeSpent;
        }
    }
    
    console.log('Final exam log:', examLog);
}

/**
 * Opens Gmail compose with exam log
 */
function openGmailCompose() {
    const subject = encodeURIComponent(examConfig.submission.subjectLine);
    const body = encodeURIComponent(JSON.stringify(examLog, null, 2));
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
    
    // Show success message
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="submission-success">
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h2 class="success-title">Exam Submitted Successfully!</h2>
                <p class="success-text">Your exam has been processed. Gmail will open in a new tab with your responses.</p>
                <p class="success-subtext">If Gmail doesn't open automatically, you can manually copy your responses.</p>
                <div class="success-actions">
                    <button class="btn-primary" onclick="window.open('${gmailURL}', '_blank')">
                        <span class="btn-icon">📧</span>
                        Open Gmail
                    </button>
                    <button class="btn-secondary" onclick="location.reload()">
                        <span class="btn-icon">🔄</span>
                        Take Another Test
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Auto-open Gmail
    window.open(gmailURL, '_blank');
}

/**
 * Shows exam instructions in a modal
 */
function showInstructions() {
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
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalStyles();
    document.body.style.overflow = 'hidden';
}

/**
 * Generates comprehensive instructions content
 */
function generateInstructionsContent() {
    const totalDuration = examConfig.examDuration + (examConfig.graceTime || 0);
    const durationHours = Math.floor(totalDuration / 3600);
    const durationMinutes = Math.floor((totalDuration % 3600) / 60);
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
                    <li>Click on any selected option again to deselect it</li>
                    <li>Use the "Clear Response" button to clear your current selection</li>
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
    if (event && event.target.id !== 'instructionsModal') return;
    
    const modal = document.getElementById('instructionsModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

/**
 * Applies dynamic theme colors
 */
function applyThemeColors() {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', themeColors.primaryColor.replace(/`/g, ''));
    root.style.setProperty('--attempted-color', themeColors.attemptedColor.replace(/`/g, ''));
    root.style.setProperty('--unattempted-color', themeColors.unattemptedColor.replace(/`/g, ''));
    root.style.setProperty('--review-color', themeColors.reviewColor.replace(/`/g, ''));
    
    // Apply primary color to specific elements
    const primaryElements = document.querySelectorAll('#examTitle, .table-header');
    primaryElements.forEach(element => {
        element.style.color = themeColors.primaryColor.replace(/`/g, '');
    });
    
    // Apply border colors to table
    const table = document.querySelector('.sections-table');
    if (table) {
        table.style.borderColor = themeColors.primaryColor.replace(/`/g, '');
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
        return dateString;
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
 * Adds dynamic styles for the enhanced exam interface
 */
function addModalStyles() {
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
        
        /* Enhanced Exam Interface Styles */
        .exam-interface {
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: #f0f2f5;
        }
        
        .exam-header-bar {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-bottom: 1px solid #dee2e6;
            padding: 20px 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            position: relative;
        }
        
        .exam-header-bar::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, 
                var(--primary-color, #2c3e50) 0%, 
                var(--attempted-color, #2ecc71) 50%, 
                var(--review-color, #f39c12) 100%);
        }
        
        .exam-header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1600px;
            margin: 0 auto;
        }
        
        .exam-title-small {
            margin: 0;
            font-size: 1.5em;
            background: linear-gradient(135deg, var(--primary-color, #2c3e50) 0%, #34495e 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        
        .exam-stats {
            display: flex;
            gap: 20px;
            align-items: center;
        }
        
        .stats-item {
            display: flex;
            align-items: center;
            gap: 5px;
            background: #f8f9fa;
            padding: 8px 12px;
            border-radius: 6px;
            border: 1px solid #e9ecef;
        }
        
        .stats-label {
            font-weight: 500;
            color: #6c757d;
            font-size: 0.9em;
        }
        
        .stats-value {
            font-weight: 700;
            color: var(--primary-color, #2c3e50);
        }
        
        .timer-container {
            display: flex;
            align-items: center;
            gap: 12px;
            background: linear-gradient(135deg, var(--primary-color, #2c3e50) 0%, #34495e 100%);
            padding: 14px 24px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1);
            position: relative;
            overflow: hidden;
        }
        
        .timer-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .timer-label {
            font-weight: 600;
            color: white;
            font-size: 0.9em;
        }
        
        .timer {
            background: rgba(0,0,0,0.15);
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-family: 'Segoe UI', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 1.4em;
            font-weight: 700;
            border: 2px solid rgba(255,255,255,0.2);
            backdrop-filter: blur(10px);
            letter-spacing: 2px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .timer.warning {
            background: #dc3545;
            border-color: #dc3545;
            animation: timerPulse 1s infinite;
        }
        
        @keyframes timerPulse {
            0%, 100% { 
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7);
            }
            50% { 
                transform: scale(1.05);
                box-shadow: 0 0 0 10px rgba(220, 53, 69, 0);
            }
        }
        
        .exam-body {
            flex: 1;
            display: flex;
            max-width: 1600px;
            margin: 0 auto;
            width: 100%;
            gap: 25px;
            padding: 25px;
            overflow: hidden;
        }
        
        /* Enhanced Question Palette */
        .question-palette {
            width: 360px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            overflow: hidden;
            border: 1px solid rgba(0,0,0,0.06);
        }
        
        .palette-header {
            background: linear-gradient(135deg, var(--primary-color, #2c3e50) 0%, #34495e 100%);
            color: white;
            padding: 24px 28px;
            position: relative;
            overflow: hidden;
        }
        
        .palette-header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: headerGlow 4s ease-in-out infinite;
        }
        
        @keyframes headerGlow {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-20px, -20px); }
        }
        
        .palette-title {
            margin: 0 0 15px 0;
            font-size: 1.2em;
            font-weight: 600;
        }
        
        .legend {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85em;
            background: rgba(255,255,255,0.1);
            padding: 4px 8px;
            border-radius: 4px;
        }
        
        .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            border: 1px solid rgba(255,255,255,0.3);
        }
        
        .legend-color.attempted {
            background: var(--attempted-color, #2ecc71);
        }
        
        .legend-color.unattempted {
            background: var(--unattempted-color, #e74c3c);
        }
        
        .legend-color.review {
            background: var(--review-color, #f39c12);
        }
        
        .palette-sections {
            max-height: calc(100vh - 250px);
            overflow-y: auto;
            padding: 0;
        }
        
        .section-palette {
            border-bottom: 1px solid #f0f2f5;
            padding: 22px 28px;
            transition: background 0.3s ease;
        }
        
        .section-palette:hover {
            background: #fafbfc;
        }
        
        .section-palette:last-child {
            border-bottom: none;
        }
        
        .section-palette-header {
            margin-bottom: 16px;
        }
        
        .section-palette-title {
            margin: 0 0 10px 0;
            font-size: 1.15em;
            font-weight: 700;
            color: var(--primary-color, #2c3e50);
            letter-spacing: -0.3px;
        }
        
        .section-categories {
            display: flex;
            gap: 8px;
            margin-bottom: 10px;
        }
        
        .category-badge {
            font-size: 0.75em;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 500;
        }
        
        .cat-1 {
            background: #e3f2fd;
            color: #1565c0;
            border: 1px solid #bbdefb;
        }
        
        .cat-2 {
            background: #f3e5f5;
            color: #7b1fa2;
            border: 1px solid #ce93d8;
        }
        
        .section-stats {
            display: flex;
            gap: 12px;
            align-items: center;
        }
        
        .stat-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            font-size: 0.75em;
            font-weight: 600;
            color: white;
        }
        
        .attempted-stat {
            background: var(--attempted-color, #2ecc71);
        }
        
        .review-stat {
            background: var(--review-color, #f39c12);
        }
        
        .unattempted-stat {
            background: var(--unattempted-color, #e74c3c);
        }
        
        .section-palette-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;
        }
        
        .palette-item {
            width: 44px;
            height: 44px;
            border: 2px solid #e1e4e8;
            background: white;
            cursor: pointer;
            border-radius: 8px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 0.95em;
            position: relative;
            box-shadow: 0 2px 4px rgba(0,0,0,0.04);
        }
        
        .palette-item::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 8px;
            opacity: 0;
            transition: opacity 0.25s ease;
            box-shadow: 0 8px 16px rgba(0,0,0,0.12);
        }
        
        .palette-item:hover::after {
            opacity: 1;
        }
        
        .palette-item:hover {
            transform: translateY(-3px) scale(1.05);
            border-color: var(--primary-color, #2c3e50);
        }
        
        .palette-item.current {
            border-color: var(--primary-color, #2c3e50);
            border-width: 3px;
            box-shadow: 0 0 0 4px rgba(44, 62, 80, 0.12), 0 4px 12px rgba(0,0,0,0.1);
            transform: scale(1.15);
            z-index: 10;
        }
        
        .palette-item.attempted {
            background: linear-gradient(135deg, var(--attempted-color, #2ecc71) 0%, #27ae60 100%);
            color: white;
            border-color: var(--attempted-color, #2ecc71);
            box-shadow: 0 4px 8px rgba(46, 204, 113, 0.25);
        }
        
        .palette-item.unattempted {
            background: linear-gradient(135deg, var(--unattempted-color, #e74c3c) 0%, #c0392b 100%);
            color: white;
            border-color: var(--unattempted-color, #e74c3c);
            box-shadow: 0 4px 8px rgba(231, 76, 60, 0.25);
        }
        
        .palette-item.review {
            background: linear-gradient(135deg, var(--review-color, #f39c12) 0%, #e67e22 100%);
            color: white;
            border-color: var(--review-color, #f39c12);
            box-shadow: 0 4px 8px rgba(243, 156, 18, 0.25);
        }
        
        /* Enhanced Question Panel */
        .question-panel {
            flex: 1;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(0,0,0,0.06);
        }
        
        .question-content {
            flex: 1;
            padding: 40px;
            overflow-y: auto;
        }
        
        .question-content::-webkit-scrollbar {
            width: 8px;
        }
        
        .question-content::-webkit-scrollbar-track {
            background: #f1f3f5;
            border-radius: 10px;
        }
        
        .question-content::-webkit-scrollbar-thumb {
            background: var(--primary-color, #2c3e50);
            border-radius: 10px;
        }
        
        .question-content::-webkit-scrollbar-thumb:hover {
            background: #34495e;
        }
        
        .question-header {
            margin-bottom: 35px;
            padding-bottom: 30px;
            border-bottom: 2px solid #f0f2f5;
            position: relative;
        }
        
        .question-header::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 60px;
            height: 2px;
            background: var(--primary-color, #2c3e50);
        }
        
        .question-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .question-number-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, var(--primary-color, #2c3e50) 0%, #34495e 100%);
            color: white;
            padding: 14px 24px;
            border-radius: 10px;
            font-weight: 700;
            box-shadow: 0 4px 12px rgba(44, 62, 80, 0.25);
            position: relative;
            overflow: hidden;
        }
        
        .question-number-badge::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: badgeShimmer 2s infinite;
        }
        
        @keyframes badgeShimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .question-number {
            font-size: 1.1em;
        }
        
        .question-total {
            font-size: 0.9em;
            opacity: 0.8;
        }
        
        .question-info {
            display: flex;
            gap: 12px;
        }
        
        .question-section,
        .question-category {
            background: #f8f9fa;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.9em;
            font-weight: 500;
            color: #495057;
            border: 1px solid #e9ecef;
        }
        
        .question-marks {
            display: flex;
            gap: 8px;
            align-items: center;
        }
        
        .marks-positive {
            background: #d4edda;
            color: #155724;
            padding: 6px 12px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9em;
            border: 1px solid #c3e6cb;
        }
        
        .marks-negative {
            background: #f8d7da;
            color: #721c24;
            padding: 6px 12px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9em;
            border: 1px solid #f5c6cb;
        }
        
        .question-text {
            font-size: 1.2em;
            line-height: 1.8;
            margin-bottom: 35px;
            color: #1a202c;
            font-weight: 400;
            letter-spacing: -0.2px;
        }
        
        .options-container {
            display: grid;
            gap: 16px;
        }
        
        .option-label {
            display: flex;
            align-items: flex-start;
            gap: 16px;
            padding: 22px;
            border: 2px solid #e1e4e8;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            background: #fafbfc;
            position: relative;
            overflow: hidden;
        }
        
        .option-label::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: var(--primary-color, #2c3e50);
            transform: scaleY(0);
            transition: transform 0.3s ease;
        }
        
        .option-label:hover {
            border-color: var(--primary-color, #2c3e50);
            background: white;
            transform: translateX(4px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }
        
        .option-label:hover::before {
            transform: scaleY(1);
        }
        
        .option-label.selected {
            border-color: var(--primary-color, #2c3e50);
            background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
            box-shadow: 0 0 0 4px rgba(44, 62, 80, 0.08), 0 8px 20px rgba(44, 62, 80, 0.12);
            transform: translateX(4px);
        }
        
        .option-label.selected::before {
            transform: scaleY(1);
            background: var(--attempted-color, #2ecc71);
        }
        
        .option-label input[type="radio"] {
            width: 20px;
            height: 20px;
            margin: 0;
            accent-color: var(--primary-color, #2c3e50);
        }
        
        .option-marker {
            background: linear-gradient(135deg, var(--primary-color, #2c3e50) 0%, #34495e 100%);
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.95em;
            flex-shrink: 0;
            box-shadow: 0 4px 8px rgba(44, 62, 80, 0.2);
            transition: all 0.3s ease;
        }
        
        .option-label:hover .option-marker {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 6px 12px rgba(44, 62, 80, 0.3);
        }
        
        .option-label.selected .option-marker {
            background: linear-gradient(135deg, var(--attempted-color, #2ecc71) 0%, #27ae60 100%);
            transform: scale(1.15);
            box-shadow: 0 6px 12px rgba(46, 204, 113, 0.4);
        }
        
        .option-text {
            flex: 1;
            line-height: 1.6;
            font-size: 1.05em;
            color: #2c3e50;
        }
        
        /* Enhanced Controls */
        .question-controls {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 25px 35px;
            border-top: 1px solid #dee2e6;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .control-group-left,
        .control-group-center,
        .control-group-right {
            display: flex;
            gap: 12px;
            align-items: center;
        }
        
        .question-controls .btn-primary,
        .question-controls .btn-secondary,
        .question-controls .btn-outline {
            padding: 14px 24px;
            border-radius: 8px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: none;
            cursor: pointer;
            font-size: 0.95em;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .question-controls .btn-primary {
            background: var(--primary-color, #2c3e50);
            color: white;
        }
        
        .question-controls .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .question-controls .btn-outline {
            background: white;
            color: var(--primary-color, #2c3e50);
            border: 2px solid var(--primary-color, #2c3e50);
        }
        
        .question-controls .btn-outline.marked {
            background: var(--review-color, #f39c12);
            color: white;
            border-color: var(--review-color, #f39c12);
        }
        
        .question-controls button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none !important;
        }
        
        .question-controls button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        
        .question-controls .btn-primary:hover:not(:disabled) {
            background: #34495e;
        }
        
        .question-controls .btn-secondary:hover:not(:disabled) {
            background: #5a6268;
        }
        
        .question-controls .btn-outline:hover:not(:disabled) {
            background: var(--primary-color, #2c3e50);
            color: white;
        }
        
        .submit-btn {
            background: #dc3545 !important;
            animation: submitPulse 2s infinite;
        }
        
        .submit-btn:hover:not(:disabled) {
            background: #c82333 !important;
        }
        
        @keyframes submitPulse {
            0%, 100% { box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            50% { box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3); }
        }
        
        /* Submission States */
        .submission-container,
        .submission-success {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .submission-content,
        .success-content {
            text-align: center;
            background: white;
            padding: 50px;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            max-width: 500px;
            width: 90%;
        }
        
        .loading-spinner.large {
            width: 80px;
            height: 80px;
            margin: 0 auto 30px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary-color, #2c3e50);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .submission-title,
        .success-title {
            color: var(--primary-color, #2c3e50);
            margin-bottom: 20px;
            font-size: 1.8em;
            font-weight: 700;
        }
        
        .submission-text,
        .success-text {
            color: #666;
            margin-bottom: 30px;
            line-height: 1.6;
            font-size: 1.1em;
        }
        
        .success-subtext {
            color: #888;
            font-size: 0.95em;
            margin-bottom: 35px;
            line-height: 1.5;
        }
        
        .submission-progress {
            margin-top: 30px;
        }
        
        .progress-bar {
            background: #e9ecef;
            border-radius: 12px;
            overflow: hidden;
            height: 12px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .progress-fill {
            background: linear-gradient(90deg, var(--primary-color, #2c3e50) 0%, var(--attempted-color, #2ecc71) 100%);
            height: 100%;
            width: 0%;
            animation: progressFill 2s ease-out forwards;
            border-radius: 12px;
        }
        
        @keyframes progressFill {
            to { width: 100%; }
        }
        
        .success-icon {
            font-size: 5em;
            margin-bottom: 25px;
            animation: successBounce 0.8s ease-out;
        }
        
        @keyframes successBounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .success-actions {
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
            .exam-header-content {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            
            .exam-stats {
                order: -1;
            }
            
            .exam-body {
                flex-direction: column;
                padding: 15px;
                gap: 20px;
            }
            
            .question-palette {
                width: 100%;
                order: 2;
                max-height: 400px;
            }
            
            .palette-sections {
                max-height: 300px;
            }
            
            .section-palette-grid {
                grid-template-columns: repeat(8, 1fr);
            }
            
            .palette-item {
                width: 35px;
                height: 35px;
                font-size: 0.85em;
            }
            
            .question-panel {
                order: 1;
            }
            
            .question-content {
                padding: 25px;
            }
            
            .question-controls {
                padding: 20px 25px;
                flex-direction: column;
                gap: 15px;
            }
            
            .control-group-left,
            .control-group-center,
            .control-group-right {
                width: 100%;
                justify-content: center;
            }
            
            .question-controls button {
                flex: 1;
                min-width: 120px;
            }
            
            .question-meta {
                flex-direction: column;
                align-items: stretch;
                gap: 12px;
            }
            
            .question-info {
                justify-content: center;
                flex-wrap: wrap;
            }
            
            .question-marks {
                justify-content: center;
            }
        }
        
        @media (max-width: 768px) {
            .exam-header-bar {
                padding: 15px 20px;
            }
            
            .exam-title-small {
                font-size: 1.2em;
            }
            
            .exam-body {
                padding: 10px;
                gap: 15px;
            }
            
            .question-palette {
                max-height: 300px;
            }
            
            .palette-header,
            .section-palette {
                padding: 15px 20px;
            }
            
            .section-palette-grid {
                grid-template-columns: repeat(6, 1fr);
                gap: 6px;
            }
            
            .palette-item {
                width: 32px;
                height: 32px;
                font-size: 0.8em;
            }
            
            .question-content {
                padding: 20px;
            }
            
            .question-text {
                font-size: 1.1em;
            }
            
            .option-label {
                padding: 15px;
                gap: 12px;
            }
            
            .option-marker {
                width: 28px;
                height: 28px;
                font-size: 0.85em;
            }
            
            .question-controls {
                padding: 15px 20px;
            }
            
            .modal-container {
                width: 95%;
                max-height: 95vh;
            }
            
            .modal-header,
            .modal-content,
            .modal-footer {
                padding: 15px 20px;
            }
            
            .submission-content,
            .success-content {
                padding: 30px 20px;
            }
            
            .loading-spinner.large {
                width: 60px;
                height: 60px;
            }
        }
        
        /* Accessibility Improvements */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
            .palette-item,
            .option-label,
            .question-controls button {
                border-width: 2px;
            }
            
            .timer {
                border-width: 3px;
            }
        }
        
        /* Focus styles for keyboard navigation */
        .palette-item:focus,
        .question-controls button:focus,
        .option-label:focus-within {
            outline: 3px solid var(--primary-color, #2c3e50);
            outline-offset: 2px;
        }
        
        /* Print styles */
        @media print {
            .exam-interface {
                background: white;
            }
            
            .question-palette,
            .question-controls {
                display: none;
            }
            
            .question-panel {
                box-shadow: none;
                border: 1px solid #ccc;
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
    const isTablet = window.innerWidth <= 1024;
    const appContainer = document.getElementById('app');
    
    if (isMobile) {
        appContainer.classList.add('mobile-view');
        appContainer.classList.remove('tablet-view');
    } else if (isTablet) {
        appContainer.classList.add('tablet-view');
        appContainer.classList.remove('mobile-view');
    } else {
        appContainer.classList.remove('mobile-view', 'tablet-view');
    }
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeExamPortal();
    window.addEventListener('resize', handleResponsiveDesign);
    handleResponsiveDesign();
});

// Prevent accidental page refresh during exam
window.addEventListener('beforeunload', (e) => {
    if (isExamStarted && examTimer) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your exam progress will be lost.';
        return e.returnValue;
    }
});

// Keyboard shortcuts for navigation
document.addEventListener('keydown', (e) => {
    if (!isExamStarted) return;
    
    // Arrow key navigation
    if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        previousQuestion();
    } else if (e.key === 'ArrowRight' && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        nextQuestion();
    }
    
    // Number key navigation (1-9)
    if (e.key >= '1' && e.key <= '9' && !e.ctrlKey && !e.altKey) {
        const optionIndex = parseInt(e.key) - 1;
        const currentQuestion = questions[currentQuestionIndex];
        if (currentQuestion && optionIndex < currentQuestion.options.length) {
            e.preventDefault();
            selectOption(currentQuestion.id, optionIndex);
        }
    }
    
    // Shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key.toLowerCase()) {
            case 'm':
                e.preventDefault();
                toggleReview();
                break;
            case 'delete':
            case 'backspace':
                e.preventDefault();
                clearSelection();
                break;
        }
    }
});

// Auto-save functionality
setInterval(() => {
    if (isExamStarted && examLog) {
        // Save to session storage as backup (if available)
        try {
            if (typeof(Storage) !== "undefined") {
                sessionStorage.setItem('examBackup', JSON.stringify(examLog));
            }
        } catch (e) {
            console.log('Session storage not available');
        }
    }
}, 30000); // Save every 30 seconds

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeExamPortal,
        loadExamConfiguration,
        startExam,
        showInstructions,
        submitExam,
        selectOption,
        clearSelection,
        toggleReview,
        navigateToQuestion
    };
}
