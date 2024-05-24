"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Contact {
    constructor(id, name, email, phone, dob, balance, language, photo) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dob = dob;
        this.balance = balance;
        this.language = language;
        this.photo = photo;
    }
}
let UserArrayList = new Array();
renderContacts();
function renderContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        // UserArrayList.push(new Contact(1, "Preethika", "preethi@gmail.com", "9874563215", "11/01/2000", 5000, ["Tamil"], [""]));
        // UserArrayList.push(new Contact(2, "Thanusha", "thnusha@gmail.com", "874569321", "11/01/2000", 8000, ["English"], [""]));
        try {
            const tableBody = document.getElementById('contactTableBody');
            tableBody.innerHTML = '';
            UserArrayList.forEach(Contact => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${Contact.id}</td>
                <td>${Contact.name}</td>
                <td>${Contact.email}</td>
                <td>${Contact.phone}</td>
                <td>${Contact.dob.split('T')[0].split('-').reverse().join('/')}</td>
                <td>${Contact.balance}</td>
                <td>${Contact.language.join(', ')}</td>
                <td><img src="${Contact.photo[0]}" style="width: 100px; height: auto", alt="Photo"></td>
                <td>
                    <button onclick="editContact('${Contact.id}')">Edit</button>
                    <button onclick="deleteContact('${Contact.id}')">Delete</button>
                </td
            `;
                tableBody.appendChild(row);
            });
        }
        catch (error) {
            console.error('Error fetching contacts: ', error);
        }
    });
}
let editingID = 0;
const form = document.getElementById("form1"); // form element
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const dobInput = document.getElementById("date");
const balanceInput = document.getElementById("balance");
const photoInput = document.getElementById("fileInput");
const selectElement = document.getElementById("multiSelect");
form.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const dob = dobInput.value.trim();
    const balance = parseFloat(balanceInput.value.trim());
    const selectedOptions = Array.from(selectElement.selectedOptions).map(option => option.value);
    const file = (_a = photoInput.files) === null || _a === void 0 ? void 0 : _a[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        var _a;
        const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
        if (editingID !== 0) {
            const contact1 = {
                id: editingID,
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                language: selectedOptions,
                balance: balance,
                photo: [base64String]
            };
            updateContact(editingID, contact1);
        }
        else {
            const contact1 = {
                id: UserArrayList.length + 1, // Only Undefined will be auto incremented in DB
                name: name,
                email: email,
                phone: phone,
                dob: dob,
                language: selectedOptions,
                balance: balance,
                photo: [base64String]
            };
            addContact(contact1);
        }
    };
    if (file) {
        reader.readAsDataURL(file); // Read the file as a data URL (Base64 encoded)
    }
    form.reset();
});
function addContact(contact) {
    UserArrayList.push(contact);
    renderContacts();
}
function updateContact(editingID, contact) {
    UserArrayList.forEach(contact1 => {
        if (editingID == contact1.id) {
            contact1.name = contact.name;
            contact1.email = contact.email;
            contact1.phone = contact.phone;
            contact1.dob = contact.dob;
            contact1.language = contact.language;
            contact1.balance = contact.balance;
            contact1.photo = contact.photo;
        }
    });
    renderContacts();
}
function editContact(editingID1) {
    editingID = parseInt(editingID1);
    const item = UserArrayList.find((item) => item.id === editingID);
    if (item) {
        nameInput.value = item.name;
        emailInput.value = item.email;
        phoneInput.value = item.phone;
        balanceInput.value = String(item.balance);
        const dobDate = new Date(item.dob);
        const formattedDOB = dobDate.toLocaleDateString("es-CL").split("-");
        const format = formattedDOB[2] + "-" + formattedDOB[1] + "-" + formattedDOB[0];
        dobInput.value = format;
        if (item.language.length > 0) {
            // Set the value of the select element to the first language in the array
            selectElement.value = item.language[0];
            // If there are multiple languages, you may want to select additional options or handle them differently
            for (let i = 1; i < item.language.length; i++) {
                // Assuming each language option has a unique value
                const languageOption = selectElement.querySelector(`option[value="${item.language[i]}"]`);
                if (languageOption) {
                    languageOption.selected = true;
                }
            }
        }
        else {
            // If no languages are specified, you may want to set a default option or handle it differently
            selectElement.value = ""; // or some default value
        }
    }
}
function deleteContact(editingID1) {
    editingID = parseInt(editingID1);
    UserArrayList = UserArrayList.filter((item) => item.id !== editingID);
    renderContacts();
}
