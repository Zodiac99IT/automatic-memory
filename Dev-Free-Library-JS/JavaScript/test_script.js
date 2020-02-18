$(document).ready(function(){
    $("#dflButton").dflButton({
        text: "AAAAAAA",
        onClick: function(){
            alert("Test")
        },
        height: 40,
        disabled: false,
        elementAttr: {
            id: "TestButtonId",
            class: "CustomButton"
        },
        hint: "Just a Button",
        styling: 'text'
    });

    $('#dflDataGrid').dflDataGrid({
        data: [{ id: 0, value: 'a'}, { id:1, value: 'b'}, { puppa:'melo', ciao:'25'}],
        disabled: true,
        allowColumnSearch: true,
        onCellHover: function(e){
            e.style.cursor = 'pointer';
        }
    });
});