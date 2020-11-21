export class TreeChecker{

    constructor(options={}){
        this.options = options;

        this.$wrapper = document.querySelector(this.options.selector);
        this.$wrapper.innerHTML = '';
        
    }

    htmlTreeChecker(){
        return `
            <ul class="tree">
                <li>
                    <input type="checkbox" />
                    <ul class="tree">
                        <li>
                            <input type="checkbox" />
                        </li>
                        <li>
                            <input type="checkbox" />
                        </li>
                        <li>
                            <input type="checkbox" />
                            <ul class="tree">
                                <li>
                                    <input type="checkbox" />
                                </li>
                                <li>
                                    <input type="checkbox" />
                                </li>
                                <li>
                                    <input type="checkbox" />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <input type="checkbox" />
                </li>
                <li>
                    <input type="checkbox" />
                    <ul class="tree">
                        <li>
                            <input type="checkbox" />
                        </li>
                    </ul>
                </li>
            </ul>
        `;
    }

    draw(){
        this.$wrapper.innerHTML = this.htmlTreeChecker();
    }


    render(){
        this.draw();
        
        const walk = (el, checked) => {

            if(el.type === 'checkbox'){
                el.checked = checked;
                const next = el.parentNode.children[1];
                if(next && next.classList.contains('tree')) walk(next, checked);
            }else{
                [...el.children].forEach((child) => walk(child, checked));
            }
            
        }
        this.$wrapper.addEventListener('click', (e) => {
            const target = e.target;
            if(target.type === 'checkbox'){
                const checked = e.target.checked;
                walk(target, checked);
            }
        });
    }



}