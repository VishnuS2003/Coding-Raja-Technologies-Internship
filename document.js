document.addEventListener('DOMContentLoaded', function () {
    const app = document.getElementById('app');
    const templates = [
        {
            name: 'Template 1',
            fields: [
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
                { id: 'phone', label: 'Phone', type: 'tel', placeholder: 'Enter your phone number' }
            ]
        },
        {
            name: 'Template 2',
            fields: [
                { id: 'education', label: 'Education', type: 'text', placeholder: 'Enter your education' },
                { id: 'experience', label: 'Experience', type: 'text', placeholder: 'Enter your experience' },
                { id: 'skills', label: 'Skills', type: 'text', placeholder: 'Enter your skills' }
            ]
        }
    ];

    let currentTemplate = templates[0]; // Default template

    function renderForm() {
        const formHTML = currentTemplate.fields.map(field => `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <input type="${field.type}" id="${field.id}" placeholder="${field.placeholder}">
            </div>
        `).join('');

        app.innerHTML = `
            <div class="container">
                <h2>Form Builder</h2>
                <select id="templateSelector">
                    ${templates.map((template, index) => `<option value="${index}">${template.name}</option>`).join('')}
                </select>
                ${formHTML}
                <button onclick="previewForm()">Preview</button>
                <div class="preview-container" id="previewContainer"></div>
            </div>
        `;

        document.getElementById('templateSelector').addEventListener('change', function () {
            currentTemplate = templates[this.value];
            renderForm();
        });
    }

    window.previewForm = function () {
        const formInputs = Array.from(document.querySelectorAll('input')).map(input => ({ [input.id]: input.value }));
        const previewContainer = document.getElementById('previewContainer');
        previewContainer.innerHTML = '';

        formInputs.forEach(input => {
            const key = Object.keys(input)[0];
            const value = input[key];
            previewContainer.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        });
    };

    renderForm();
});
