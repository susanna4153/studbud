// Allows us to import this class into the other JS files
export default class kanbanAPI {
    
    //Get all items in a particular column
    static getItems(columnId) {
        //Check if column.id = to column.Id being parsed in, if so, put it into the const. 
        const column = read().find(column => column.id == columnId);

        //if no column, then return empty array
        if (!column) {
            return [];
        }

        return column.items;
    }

    //adding a item to a column
    static insertItem(columnId, content) {
        const data = read ();
        const column = data().find(column => column.id == columnId);
        //New item to insert
        const item = {
            id: Math.floor(Math.random()*1000000),
            content
        }

        //If no column, throw new error
        if (!column) {
            throw new Error("Column does not exist");
        }

        //If column does exist, add new item to bottom of the list
        column.items.push(item);
        save(data);

        //Return newly created item
        return item;
    }

    static updateItem(itemId, newProps) {
        const data = read();
        
        //array destructuring
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id == itemId);
                
                if (item) {
                    return [item, column];
               }
            }
        })();

        //if no item, throw error
        if (!item) {
            throw new Error("Item not found.");
        }

        item.content = newProps.content === undefined


    }
}

//Functions to interact with local storage directly
function read() {
    const json = localStorage.getItem("kanban-data");

    if (!json) {

        //If user is using board for the first time, return the following default values
        return [
            {
                id: 1,
                items: []
            },
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            },
        ]
    }

    return JSON.parse(json);
}

function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
}