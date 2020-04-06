let shopModule = (function () {
    // 获取元素
    let navList = document.querySelectorAll('.navbar-nav .nav-item'),
        product = document.querySelector('.product'),
        data = null;

    // 获取数据
    let getData = function getData() {
        let xhr = new XMLHttpRequest();
        xhr.open('get', './json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                data = JSON.parse(xhr.response);
            }
        }
        xhr.send(null);
    }
    //渲染数据
    let render = function render() {
        let str = ``;
        data.forEach(item => {
            let { title, price, time, hot, img } = item;
            str += `<div class="card">
                    <img src="${img}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">价格：￥${price}</p>
                        <p class="card-text">时间：${time}</p>
                        <p class="card-text">热度：${hot}</p>
                    </div>
                 </div>`
        });
        product.innerHTML = str;
    }


    //排序
    let clear = function clear() {
        [].forEach.call(navList, item => {
            if (item !== this) {
                item.flag = -1;
            }
        })
    }

    let handle = function handle() {
        [].forEach.call(navList, (item, index) => {
            item.flag = -1;
            console.log(item);
            item.onclick = function () {
                clear.call(this);
                this.flag *= -1;
                console.log(1);
                
                let pai = this.getAttribute('data-pai');
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, '');
                    b = String(b[pai]).replace(/-/g, '');
                    return (a - b) * this.flag;
                });
                render();
            };
        });
    };


    return {
        init() {
            getData();
            render();
            handle();
        }
    }
})()
shopModule.init();