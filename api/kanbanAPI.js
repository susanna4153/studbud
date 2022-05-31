// On the kanban.js file: import KanbanAPI from "../../../api/kanbanAPI";



// Allows us to import this class into the other JS files
export default class kanbanAPI {
    //Get all items in a particular column
    static getItems(columnId) {
      //Check if column.id = to column.Id being parsed in, if so, put it into the const.
      const column = read().find((column) => column.id == columnId);
  
      //if no column, then return empty array
      if (!column) {
        return [];
      }
  
      return column.items;
    }
  
    //Adding a item to a column
    static insertItem(columnId, content) {
      const data = read();
      const column = data.find((column) => column.id == columnId);
      //New item to insert
      const item = {
        id: Math.floor(Math.random() * 1000000),
        content,
      };
  
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
  
    //ItemID inidicateds which item we are updating, new properties can be position etc.
    static updateItem(itemId, newProps) {
      //Begin with reference to data
      const data = read();
  
      //Array destructuring - get reference to item object and its current column
      const [item, currentColumn] = () => {
        for (const column of data) {
          const item = column.items.find((item) => item.id == itemId);
          if (item) {
            return [item, column];
          }
        }
      };
  
      //if no item, throw error
      if (!item) {
        throw new Error("Item not found.");
      }
  
      //Ternary Operator
      //If newProps.content is undefined, set item.content to item.content, otherwise set it to newProps.content
      // EQUIVALENT TO
          //if (newProps.content === undefined) {
          //     item.content = item.content;
          // } else {
          //     item.content = newProps.content
          // }
      item.content = newProps.content === undefined ? item.content : newProps.content;
  
      //Update column and position
      if (
          newProps.columnId !==undefined
          && newProps.position !== undefined 
      ) {
          const targetColumn = data.find(column => column.id == newProps.columnId)
  
          if (!targetColumn) {
              throw
          }
      }
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
          items: [],
        },
        {
          id: 2,
          items: [],
        },
        {
          id: 3,
          items: [],
        },
      ];
    }
  
    return JSON.parse(json);
  }
  
  function save(data) {
    localStorage.setItem("kanban-data", JSON.stringify(data));
  }
  