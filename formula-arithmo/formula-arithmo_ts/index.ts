//トークンの種別定義 
type Token = "NUMBER" | "OPERAND" | "L_BRACKET" | "R_BRACKET";

// トークンの形を定義
// 型エイリアスをインタフェースの中で使用
interface TestToken {
    type: Token;
    value: string | number;
}

//トークンの中身を定義
let testToken: TestToken = {
    type: "NUMBER",
    value: 100
}

let testTokens: TestToken[] = [{
    type: "NUMBER",
    value: 100
}, {
    type: "OPERAND",
    value: "+"
}, {
    type: "NUMBER",
    value: 25
}]

// トークンの中身を出力

console.log(testToken);
console.log(testTokens);

//　トークナイザーを作り始めている。JSを見本にJS likeから
/*let formula: string = "1 + 2";
let testTokenAry: TestToken[] = [];
for(let i = 0;i < formula.length;i++){
    formula = formula.replace(/\s/g, "");
    if(formula[i] === "+"){
        testTokenAry.push({type:"OPERAND",value:formula[i]});
    }else {

    }
}*/