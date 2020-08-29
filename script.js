window.onload = init;

function eventSetter(){
    for (let item of list.$checkBoxs){
        item.addEventListener('click',(event) => list.completeTask(event))
    };
    for(let item of list.$listItemsInput){
        item.addEventListener('change',() => list.localStorageAdd());
    }
}

function init(){
    list  = {
        $addTask: document.querySelector('.button.add'),
        $clearList: document.querySelector('.button.clear'),
        $listItems: document.querySelectorAll('.list__item'),
        $listItemsInput: document.querySelectorAll('input'),
        $list: document.querySelector('.list__task'),
        $checkBoxs: document.querySelectorAll('.item__checkbox'),
        addTask: function(value,isComplete){
            let listItem = document.createElement('li');
            let checkbox = document.createElement('i');
            let input = document.createElement('input');
            
            checkbox.classList.add('fas','fa-check-square','item__checkbox')
            input.setAttribute('type','text');
            if(isComplete){
                listItem.classList.add('complete');
                checkbox.classList.add('complete');
            }
            if (value){
                input.setAttribute('value',value);
            }
            listItem.classList.add('list__item');
            checkbox.addEventListener('click',function(event){
                list.completeTask(event);
                list.localStorageAdd();
            });
            input.addEventListener('change',() => this.localStorageAdd());
            listItem.append(checkbox);
            listItem.append(input);

            this.$list.append(listItem);
            this.$listItems = document.querySelectorAll('.list__item')
        },
        clearList: function(){
            for (let item of this.$listItems){
                if (item.classList.contains('complete')){
                    item.remove();
                }
            }
            if (this.$list.innerHTML.trim() == ''){
                this.addTask();
            }
            localStorage.clear();
            this.localStorageAdd();
        },
        completeTask: function(event){
            event.target.classList.toggle('complete');
            event.target.parentNode.classList.toggle('complete');    
        },
        localStorageAdd: function(){
            const updateList = document.querySelectorAll('input');
            localStorage.clear();
            for (let i = 0; i < updateList.length; i++){
                let info = {
                    item: updateList[i].value,
                    status: false
                }
                if(updateList[i].parentNode.classList.contains('complete')){
                    info.status = true;
                } else {
                    info.status = false;
                }
                localStorage.setItem(`${i}`,JSON.stringify(info))
            }
        },
        loadTasks: function(){
            for (let i = 0; i < localStorage.length; i++){
                let info = JSON.parse(localStorage.getItem(i));
                if (info == undefined){
                    continue; 
                }
                this.addTask(info.item,info.status);
            }
        }
    }
    list.loadTasks();
    list.$addTask.addEventListener('click',() => list.addTask());
    list.$clearList.addEventListener('click',() => list.clearList());
    eventSetter();
}