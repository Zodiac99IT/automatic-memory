
(function ($) {

    //Button
    $.fn.dflButton = function ({
        disabled = false,
        elementAttr = {},
        height = '40px',
        hint = '',
        hoverStateEnabled = false,
        icon = '',
        onClick = function () { },
        styling = 'contained',
        text = 'Button',
        useSubmitBehavior = false,
        visible = true,
        width = '150px' }) {

        //Main Object
        var button = document.createElement("button");

        //Variables
        var Attributes = ["autofocus", "form", "formaction", "name", "type", "value", "id", "class"];

        //#region types check

        //Disabled
        if (typeof disabled === "boolean") {
            button.disabled = disabled;
        }

        //elementAttr
        if (typeof elementAttr === "object") {
            Attributes.forEach(element => {
                if (elementAttr[element] !== undefined) {
                    button[element] = elementAttr[element];
                }
                if (element === "class" && elementAttr[element] !== undefined) {
                    button.classList.add(elementAttr[element]);
                }
            });
        }

        //Height
        switch (typeof height) {
            case "function":
                button.style.height = height() + 'px';
                break;
            case "number":
                button.style.height = height + 'px';
                break;
            case "string":
                button.style.height = height;
        }

        //Hint
        if (typeof hint === "string") {
            button.title = hint;
        }

        //HoverStateEnabled
        if (typeof hoverStateEnabled === "boolean") {
            if (hoverStateEnabled) {
                button.onmouseover = onClick;
            }
        }

        //Icon
        if (typeof icon === "string") {
            button.style.background = icon;
        }

        //onClick
        if (typeof onClick === "function") {
            button.onclick = onClick;
        }else if(typeof onClick === "string"){
            button.onclick = function(){ window[onClick](button) };
        }

        //Styling
        if (typeof styling === "string") {
            switch (styling) {
                case 'text':
                    button.classList.add("-dfl-button-text");
                    //button.style.backgroundColor = 'white';
                    break;
                case 'border':
                    button.classList.add("-dfl-button-border");
                    /*button.style.backgroundColor = 'white';
                    button.style.color = 'black';
                    button.style.border = '2px solid';*/
                    break;
            }
        }

        //Text
        if (typeof text === "string") {
            button.textContent = text;
        }

        //UseSubmitBehavior
        if (typeof useSubmitBehavior === 'boolean') {
            if (useSubmitBehavior) {
                button.type = 'submit';
            } else {
                button.type = 'button';
            }
        }

        //Visible
        if (typeof visible === 'boolean') {
            if (visible) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        }

        //Width
        switch (typeof width) {
            case "function":
                button.style.width = width() + 'px';
                break;
            case "number":
                button.style.width = width + 'px';
                break;
            case "string":
                button.style.width = width;
        }

        //#endregion

        button.classList.add('-dfl-button-style');
        $(this).append(button);
        return this;
    }

    //DataGrid (Table)
    $.fn.dflDataGrid = function ({
        allowColumnSearch = false,
        data = [],
        cellHintEnabled = true,
        hint = undefined,
        onCellClick = function(){},
        onCellHover = function(){},
        width = '100%',
        height = '100%'
    }) {
        //Main Object
        var table = document.createElement('table');

        //Other Objects
        var trth = document.createElement('tr');
        var th = document.createElement('th');
        var td = document.createElement('td');

        //#region types check

        //Data
        if (Array.isArray(data)) {
            var lastkeys = [];
            data.forEach(element => {
                if (typeof element === 'object') {
                    var keys = Object.keys(element);
                    for (var i = 0; i < keys.length; i++) {
                        if (lastkeys[i] != keys[i]) {
                            th = document.createElement('th');
                            th.innerText = keys[i];
                            th.classList.add("-dfl-th-style");
                            trth.append(th);
                        }
                    }
                }
                lastkeys = keys;
                
            });

            trth.classList.add("-dfl-tr-style");
            table.append(trth);

            //allowColumnSearch
            if(typeof allowColumnSearch === 'boolean'){
                if(allowColumnSearch){
                    var tableRows = table.rows;
                    var ths = tableRows[0].cells;
                    var trSearch = document.createElement('tr');
                    for(var i=0; i<ths.length; i++){
                        td = document.createElement('td');
                        td.innerHTML = '<input class="TableSearch" type="text" placeholder="Search..." style="display:block; margin:auto;" />'
                        var inputs = td.getElementsByClassName("TableSearch");
                        for(var j = 0; j<inputs.length; j++){
                            var input = inputs[j];
                            input.addEventListener('change', function(){ 
                                var tdParent = this.parentElement;
                                var tableRows = tdParent.parentElement.parentElement.rows; 
                                for(var i=2; i<tableRows.length; i++){ 
                                    if(tableRows[i].cells[tdParent.cellIndex].innerText.includes(this.value)){ 
                                        tableRows[i].style.display = "";
                                    }else{ 
                                        tableRows[i].style.display = "none";
                                    } 
                                } 
                            });
                        }
                        td.classList.add("-dfl-td-style");
                        trSearch.append(td);
                    }
                }
            }

            table.append(trSearch);

            data.forEach(element => {
                if (typeof element === 'object') {
                    var trtd = document.createElement('tr');
                    var keys = Object.keys(element);
                    var cells = table.rows[0].cells;
                    for (var i = 0; i < cells.length; i++) {
                        td = document.createElement('td');
                        for(var j = 0; j<keys.length; j++){
                            if(cells[i].innerText === keys[j]){
                                td.innerText = element[keys[j]];
                            }

                            //onCellClick
                            if(typeof onCellClick === 'function'){
                                td.onclick = onCellClick(td);
                            }else if(typeof onCellClick === 'string'){
                                if(typeof window[onCellClick] === 'function'){
                                    td.onclick = function(){ window[onCellClick](td); }
                                }
                            }

                            //onCellHover
                            if(typeof onCellHover === 'function'){
                                td.onmouseover = onCellHover(td);
                            }else if(typeof onCellHover === 'string'){
                                if(typeof window[onCellHover] === 'function'){
                                    td.onmouseover = function(){ window[onCellHover](td); }
                                }
                            }

                            td.classList.add("-dfl-td-style");
                            if(typeof cellHintEnabled === 'boolean'){
                                if(cellHintEnabled){
                                    td.title = td.innerText;
                                }
                            }
                            trtd.append(td);
                        }
                    }
                    trtd.classList.add("-dfl-tr-style");
                    table.append(trtd);
                }
            });
        }

        //Hint
        if(typeof hint === 'string'){
            table.title = hint;
        }

        //Height
        switch (typeof height) {
            case "function":
                table.style.height = height() + 'px';
                break;
            case "number":
                table.style.height = height + 'px';
                break;
            case "string":
                table.style.height = height;
        }

        //Width
        switch (typeof width) {
            case "function":
                table.style.width = width() + 'px';
                break;
            case "number":
                table.style.width = width + 'px';
                break;
            case "string":
                table.style.width = width;
        }

        //#endregion
        
        table.classList.add("-dfl-table-style")
        $(this).append(table);
    }

    //CheckBox
    $.fn.dflCheckBox = function ({
        elementAttr = {},
        name = 'DflCheckBox',
        onOptionChanged = function(){},
        text = 'CheckBox',
        value = false,
        visible = true,
        height = '20px',
        width = '20px'
    }) {
        //Main Object
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        //#region types check

        //elementAttr
        if(typeof elementAttr === 'object'){
            var keys = Object.keys(elementAttr);
            for(var i = 0; i < keys.length; i++){
                checkbox[keys[i]] = elementAttr[keys[i]];
            }
        }

        //name
        if(typeof name === 'string'){
            checkbox.name = name;
        }

        //onOptionChanged
        if(typeof onOptionChanged === 'function'){
            checkbox.onchange = onOptionChanged(checkbox);
        }else if(typeof onOptionChanged === 'string'){
            if(typeof window[onOptionChanged] === 'function'){
                checkbox.onchange = function(){ window[onOptionChanged](checkbox); }
            }
        }

        //value
        if(typeof value === 'boolean'){
            checkbox.checked = value;
        }

        //visible
        if(typeof visible === 'boolean'){
            if(visible){
                checkbox.style.display = '';
            }else{
                checkbox.style.display = 'none';
            }
        }

        //Height
        switch (typeof height) {
            case "function":
                checkbox.style.height = height() + 'px';
                break;
            case "number":
                checkbox.style.height = height + 'px';
                break;
            case "string":
                checkbox.style.height = height;
                break;
        }

        //Width
        switch (typeof width) {
            case "function":
                checkbox.style.width = width() + 'px';
                break;
            case "number":
                checkbox.style.width = width + 'px';
                break;
            case "string":
                checkbox.style.width = width;
                break;
        }

        //#endregion

        $(this).append(checkbox);

        //text check
        if(typeof text === 'string'){
            //Check after append of checkbox because it need to be the text of the checkbox
            this.append('<label>' + text + '</label>');
        }
    }

})(jQuery);