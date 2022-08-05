// Hist position
const translateHintToBottonLeftTarget = () => {
    const $target = document.querySelector("#target");
    const $hint = document.querySelector("#hint");

    const getContentBlock = function (node) {
        const isCoordsOrigin = (elem) => {
        const isRoot = elem === document;
        const position = !isRoot && window.getComputedStyle(elem).getPropertyValue("position");
        const isContentBlock = position === "absolute" || position === "relative";
        return isRoot || isContentBlock;
        }

        let elem = node.parentNode
        // Walk up the tree until we find a node that is a content block or root (document)
        for ( ; elem && !isCoordsOrigin(elem); elem = elem.parentNode ) {
        console.log("👉", elem, isCoordsOrigin(elem), window.getComputedStyle(elem).getPropertyValue("position"));
        }
        return elem;
    };
    const $contentBlock = getContentBlock($hint);
    console.log("👑 Origin", $contentBlock);

    const {x: x0, y: y0} = typeof $contentBlock.getBoundingClientRect === "undefined"
        ? {x: 0, y: 0}
        : $contentBlock.getBoundingClientRect();
    const {left: x1, bottom: y1} = $target.getBoundingClientRect();
    //const {x, y} = {x:0, y:0};
    $hint.style = `--x: ${x1 - x0}px; --y: ${y1 - y0}px`;
    console.log ({x0,y0}, {x1,y1}, $hint.style);
}

// Manage widget configuration
const addWidgetConfigurations = () => {
    const inputHeaderHeight = document.querySelector("#inputHeaderHeight");
    inputHeaderHeight.addEventListener("input", function(e) {
        document.documentElement.style.setProperty("--height", e.target.value + "vh");
        translateHintToBottonLeftTarget();
    });
    inputHeaderHeight.dispatchEvent(new Event("input"));

    // Position: static, relative, absolute
    const $inputsPosition = document.querySelectorAll("input[type=radio]");
    // iterate over each radio button
        $inputsPosition.forEach( ($input) => {
        $input.addEventListener("change", function(e) {
            document.getElementById($input.name).style.setProperty("--position", e.target.value);
            translateHintToBottonLeftTarget();
        });
        $input.checked && $input.dispatchEvent(new Event("change"));
    });

    // translation target
    const $inputTranslation = document.querySelectorAll("input[name='top'], input[name='left'], input[name='right']");
    console.log("👉", $inputTranslation);
    $inputTranslation.forEach( ($input) => {
        $input.addEventListener("input", function(e) {
            document.getElementById("target").style.setProperty("--"+$input.name, e.target.value);
            translateHintToBottonLeftTarget();
        });
        $input.dispatchEvent(new Event("input"));
    });

    // force recalculate hint position
    const $button = document.querySelector("#recalculate");
    $button.addEventListener("click", translateHintToBottonLeftTarget);
}


translateHintToBottonLeftTarget();
addWidgetConfigurations();