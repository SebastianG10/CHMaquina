 export default class Helpers {

    /**
     * Permite conocer el elemento seleccionado de un conjunto de radio buttons
     * @param {String} selector Un selector CSS que permite seleccionar el grupo de radio buttons
     * @returns {String} Retorna el atributo value del radio button seleccionado
     */
    static selectedRadioButton = selector => {
        const radio = document.querySelector(selector + ":checked")
        return radio ? radio.value : radio
    }

    static getItems = selector => {
        const items = document.querySelectorAll(selector)
        return [...items].map((item) => { // operador rest >  desestructuración
            return { value: item.value, checked: item.checked }
        })
    }

    static selectedItemList = selector => {
        const list = document.querySelector(selector)
        const item = list.options[list.selectedIndex]
        return {
            selectedIndex: list.selectedIndex,
            value: item.value,
            text: item.text,
        }
    }

    static populateSelectList = (selector, items = [], value = '', text = '', firstOption = '') => {
        let list = document.querySelector(selector)
        list.options.length = 0
        if (firstOption) {
            list.add(new Option(firstOption, ''))
        }
        items.forEach(item => list.add(new Option(item[text], item[value])))
        return list
    }

    static htmlSelectList = ({ 
        id = '', 
        cssClass = '', 
        items = [], 
        value = '', 
        text = '', 
        firstOption = '', 
        required = true, 
        disabled = false 
    }) => {
        required = required ? 'required' : ''
        disabled = disabled ? 'disabled' : ''
        let list = ''

        items.forEach(item => {
            if (firstOption === item[text]) {
                list += `<option value="${item[value]}" selected>${item[text]}</option>`
            } else {
                list += `<option value="${item[value]}">${item[text]}</option>`
            }
        })

        return `<select id ="${id}" class="${cssClass}" ${required} ${disabled}>${list}</select>`
    }

    static loadPage = async (url, container) => {
        try {
            const element = document.querySelector(container)
            if (!element) {
                throw new Error(`Parece que el selector '${container}' no es válido`)
            }

            const response = await fetch(url)
            // console.log(response);
            if (response.ok) {
                const html = await response.text()
                element.innerHTML = html
                return element // para permitir encadenamiento
            } else {
                throw new Error(
                    `${response.status} - ${response.statusText}, al intentar acceder al recurso '${response.url}'`
                )
            }
        } catch (e) {
            console.log(e)
        }
    }

    static fetchData = async (url, mode = 'json') => {

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(
                `${response.status} - ${response.statusText}, al intentar acceder al recurso '${response.url}'`
            )
        }

        if (mode == 'json') {
            return await response.json()
        } else if (mode == 'text') {
            return await response.text()
        } else {
            throw new Error(
                `${response.status} - ${response.statusText}, modo de lectura no soportado`
            )
        }
    }

}

