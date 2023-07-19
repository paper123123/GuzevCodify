const LOCAL_STORAGE_LIST_KEY = 'contacts'
const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    image: ''
}

const contactListForLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY))

if(!contactListForLocalStorage) {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify([]))
}

const inputs = document.querySelectorAll('input')
const formBtn = document.querySelector('.form_btn')
const list = document.querySelector('ul')

let contactList = contactListForLocalStorage || []

let addForm = {
    ...initialState
}

document.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn-delete')) {
        const targetId = +event.target.id
        if(confirm('Вы точно хотите удалить контакт?')) {
            deleteContact(targetId)
        }
    }
})

inputs.forEach(input => {
    input.addEventListener('input', (event) => {
        const { name, value } = event.target
        addForm = {
            ...addForm,
            [name]: value
        }
    })
})

formBtn.addEventListener('click', (event) => {
    event.preventDefault();
    createContact()
})

//! CREATE
function createContact() {
    const {
        firstName,
        lastName,
        phone,
        email,
        image
    } = addForm

    const isEmptyValid = emptyValidate(
                                        firstName,
                                        lastName,
                                        phone,
                                        email
                                      )

    if(isEmptyValid) {
        viewNotification('Заполните все поля!')
        return
    } else {
        const newContact = {
            ...addForm,
            id: Date.now()
        }

        contactList.push(newContact)
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(contactList))

        clearForm()
        render()
        viewNotification('Контакт добавлен')
    }
}

//! READ
function render() {
    list.innerHTML = ''
    contactList.forEach(contact => {
        const li = document.createElement('li')

        const {
            image,
            firstName,
            lastName,
            phone,
            email,
            id
        } = contact

        li.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${image || 'https://w.forfun.com/fetch/94/94c56e15f13f1de4740a76742b0b594f.jpeg'}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${lastName} ${firstName}</h5>
                    <p class="card-text">${phone}</p>
                    <p class="card-text">${email}</p>
                    <a id="${id}" href="#" class="btn btn-info btn-edit">Изменить</a>
                    <a id="${id}" href="#" class="btn btn-danger btn-delete">Удалить</a>
                </div>
            </div>
        `

        list.append(li)
    })
}

//! DELETE
function deleteContact(id) {
    contactList = contactList.filter(contact => contact.id !== id)
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(contactList))
    
    viewNotification('Контакт успешно удален')
    render()
}


//! HELPERS
function viewNotification(text) {
    alert(text)
}

function emptyValidate(...arguments) {
    return arguments.some(field => !field.trim())
}

function clearForm() {
    addForm = {...initialState}
    inputs.forEach(input => input.value = '')
}

render()