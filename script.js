async function foo(){
// fetcting the data 
let res = await fetch(`https://api.openbrewerydb.org/breweries`)
let tableData = await res.json(); 
// crea the obj for query selector
var state = {
    'querySet': tableData,
    'page': 1,
    'rows': 5,
    'window': 5,
    }
    
    buildTable()
    // for pagination 
    function pagination(querySet, page, rows) {
    
    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows
    
    var trimmedData = querySet.slice(trimStart, trimEnd)
    
    var pages = Math.round(querySet.length / rows);
    
    return {
        'querySet': trimmedData,
        'pages': pages,
    }
    }
    // button processing 
    function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')
    
    wrapper.innerHTML = ``
    console.log('Pages:', pages)
    
    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))
    
    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }
    
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
            maxLeft = 1
        }
        maxRight = pages
    }
    
    
    
    for (var page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }
    
    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }
    
    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }
    
    $('.page').on('click', function() {
        $('#table-body').empty()
    
        state.page = Number($(this).val())
    
        buildTable()
    })
    
    }
    
    function buildTable() {
    var table = $('#table-body')
    
    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet;
    var i = 1;
    for ( i  in myList) {
        // here forming the tabel
        var row = `<tr>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].brewery_type}</td>
                  <td>${myList[i].street} Street,   ${myList[i].city} City</td>
                  <td>${myList[i].website_url}</td>
                  <td>${myList[i].phone}</td>
                  </tr>`
        
        table.append(row)
    }
    
    pageButtons(data.pages)
    }
}
foo();
