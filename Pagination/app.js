document.addEventListener('DOMContentLoaded', () => {
    const studentUl = document.querySelector('#full-list');
    const studentList = studentUl.children;
    const ul = document.querySelector('#StudentList');
    const displayedStudents = ul.children;
    const pageButtonDiv = document.querySelector('#pagination-buttons');
    const pageButtons = pageButtonDiv.children;
    const searchBar = document.querySelector('#search-bar');
    const searchBarInput = searchBar.querySelector('input');
    const searchBarButton = searchBar.querySelector('button');
    const addName = document.querySelector('#add-name');
    const addNameInput = addName.querySelector('input');
    const addNameButton = addName.querySelector('button');


    //create page elements
    // readList(studentList);
    printList(studentList, 1);
    createPaginationButtons(studentList);
   
    // function readList()
    // //read in list of students and store in studentList. return studentList
    // // function will read in each line, sort through name and assign last name
    // // to lastName, first name to firstName, etc
    // // studentList will be filled with array of student objects upon
    // // completion of function 
    // function readList() {
    //     //currentStudent = ;
    //     //insertStudent(studentList, c
    // };


    //function insertStudent()
    //Takes in object Array studentList and object newStudent.  
    //function places newStudent into studentList in alphabetical
    //order, //based on last name --- maybe later--
    // function insertStudent(newStudent) {
    //     for (let i = 0; i < studentList.length-1; i++) {
    //         if(studentList[i].toLowerCase >= newStudent.toLowerCase) {
    //                     studentList.insertBefore(newStudent, studentList[i]);
    //                     return;
    //         } 
    //     };
    //     studentList.appendChild(newStudent);
    //     return; 
    // };   


    //function printList(studentList, pageNum)
    //Prints 10 names starting at index pageNum*10
    function printList(resultsList, pageNum) {
        let startIndex = (pageNum - 1)*10;
        
        console.log('startIndex= ' + startIndex);
        console.log('pageNum= ' + pageNum );
        //clear list
        while (displayedStudents.length != 0) {
            ul.removeChild(displayedStudents[0]);
        }
        //print new list
        for(let i =0; i <10 ;i++){
            if ( i == resultsList.length) {
                break;
            } 
            const li = document.createElement('li');
            li.cloneNode(resultsList[startIndex]);
            li.textContent = resultsList[startIndex + i].textContent;
            ul.appendChild(li);
        }
        
    };

    //function createPaginationButtons
    function createPaginationButtons(resultsList) {
        const numPages = Math.ceil(resultsList.length/10);
        for (let i = 0; i < numPages; i++) {
            if ( i >= pageButtons.length){
                let newButton = document.createElement('button');
                newButton.textContent = (i+1);
                pageButtonDiv.appendChild(newButton);
            }
        };
    };


    //search list.  will have to adjust createPagination to paginate between search results
    function searchList(nameQuery) {
        const queryResults = document.createElement('ul');
        //search through studentList and add any matches to queryResults
        for (let i = 0; i < studentList.length; i++) {
            let curName = studentList[i].textContent;
            if (curName.toLowerCase().search(nameQuery.toLowerCase()) != -1) {
                let li = document.createElement('li');
                li.cloneNode(studentList[i]);
                li.textContent = curName;
                queryResults.appendChild(li);
            }
        }
        while (pageButtons.length != 0) {
            pageButtonDiv.removeChild(pageButtonDiv.firstChild);
            
        }
        
        createPaginationButtons(queryResults.children);      
        printList(queryResults.children, 1);

    };

    //addName listener
    addNameButton.addEventListener('click', (e) => {
        e.preventDefault();    
        const text = addNameInput.value; 
        if (text == "") {
            alert("Name field cannot be empty");
        }else {
            addNameInput.value = "";
            const li = document.createElement('li');
            li.textContent = text;
            studentUl.appendChild(li);
            createPaginationButtons(studentList);  
        }
    });

    //searchbar listener
    searchBarButton.addEventListener('click', (e) => {
        e.preventDefault();  
        const text = searchBarInput.value;  
        if (text == "") {
            printList(studentList, 1);
            createPaginationButtons(studentList);
        }else {
           searchBarInput.value = "";
           searchList(text);
        }
    });

    pageButtonDiv.addEventListener('click', (e) => {
        console.log('e.target.textContent= ' +e.target.textContent);
        const text = e.target.textContent;
        printList(studentList, text);
    });
    
});