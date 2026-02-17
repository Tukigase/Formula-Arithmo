/**
 * 与えられた数式を字句解析してトークンごとに配列に格納
 * 
 * @param formula 四則演算式の文字列
 * @returns トークンごとに格納した配列
 */
function formula_tokenizer(formula) {

    // 空白削除
    formula = formula.replace(/\s/g, "");

    // トークン保管配列
    let tokenAry = [];
    let tmp = "";

    // 項、演算子ごとでトークン化
    for (let i = 0; i < formula.length; i++) {


        if (check_char_bracket(formula[i]) && (i === 0 || check_char_bracket(formula[i - 1]) || check_char_operand(formula[i - 1]))) {
            tokenAry.push(formula[i]);
            continue;
        } else if (check_char_bracket(formula[i])) {
            tokenAry.push(tmp);
            tmp = "";
            tokenAry.push(formula[i]);
            continue;
        } else if (i === 0) {
            tmp += formula[i];
        } else if (check_char_operand(formula[i]) && check_char_bracket(formula[i - 1])) {
            tokenAry.push(formula[i]);
            continue;
        } else if (check_char_operand(formula[i]) && !check_char_operand(formula[i - 1]) && i != 0) {
            tokenAry.push(tmp);
            tmp = "";
            tokenAry.push(formula[i]);
            continue;
        }
        tmp += formula[i];
    }

    if (tmp !== "") {
        tokenAry.push(tmp);
    }

    return tokenAry;
}

/**
 * トークンの配列を受け取り演算する
 * 
 * @param formula_tokens 解析したトークンの配列
 * @returns 計算結果
 */
function token_calc(formula_tokens) {
    let tmp1 = "", tmp2 = "";
    let i = 0;
    let len = formula_tokens.length;

    // 括弧の処理（再帰処理）
    let brackets_counter = 0;
    let start_bracket = null;
    while (i < len) {
        if (formula_tokens[i] === "(") {
            if (start_bracket === null) {
                start_bracket = i;
            }
            brackets_counter++;
        } else if (formula_tokens[i] === ")") {
            brackets_counter--;
            if (brackets_counter === 0) {
                let inner_ans = token_calc(formula_tokens.slice(start_bracket + 1, i));
                formula_tokens.splice(start_bracket, (i - start_bracket + 1), inner_ans);
                len = formula_tokens.length;
                i = start_bracket;
                start_bracket = null;
                continue;
            }
        }
        i++;
    }

    i = 0;
    len = formula_tokens.length;
    //掛算割算剰余算の処理
    while (i < len) {
        if (formula_tokens[i] === "*") {
            tmp1 = parseFloat(formula_tokens[i - 1]);
            tmp2 = parseFloat(formula_tokens[i + 1]);
            formula_tokens.splice(i - 1, 3, tmp1 * tmp2);
            i--;
            continue;

        } else if (formula_tokens[i] === "/") {
            tmp1 = parseFloat(formula_tokens[i - 1]);
            tmp2 = parseFloat(formula_tokens[i + 1]);
            if (tmp2 === 0) {
                throw new Error("0除算が発生したため、処理を中断しました。");
            }
            formula_tokens.splice(i - 1, 3, tmp1 / tmp2);
            i--;
            continue;
        } else if (formula_tokens[i] === "%") {
            tmp1 = parseFloat(formula_tokens[i - 1]);
            tmp2 = parseFloat(formula_tokens[i + 1]);
            if (tmp2 === 0) {
                throw new Error("0除算が発生したため、処理を中断しました。");
            }
            formula_tokens.splice(i - 1, 3, tmp1 % tmp2);
            i--;
            continue;
        }
        i++;
    }
    // 以下、加減算の処理
    let ans = parseFloat(formula_tokens[0]);
    for (let j = 1; j < formula_tokens.length; j++) {
        if (formula_tokens[j - 1] === "+") {
            ans += parseFloat(formula_tokens[j]);
        } else if (formula_tokens[j - 1] === "-") {
            ans -= parseFloat(formula_tokens[j]);
        }
    }
    return ans;
}

/**
 * 四則演算式の文字列を受け取り、計算結果を出力。
 * 
 * @param formula 四則演算式の文字列
 * @returns 計算結果
 */
function arith_operand(formula) {

    let formula_tokens = formula_tokenizer(formula);
    return token_calc(formula_tokens);

}

function check_char_operand(char) {
    const regex = /[+\-*/%]/;

    return regex.test(char);
}
function check_char_bracket(char) {
    const regex = /[()]/;

    return regex.test(char);
}


console.log(arith_operand("100 - 10"));
console.log(arith_operand("100 * 10"));
console.log(arith_operand("100 + 10"));
console.log(arith_operand("100 / 10"));
console.log(arith_operand("100 + 33 * 10"));
console.log(arith_operand("10 / 2 * 10 % 3"));
console.log(arith_operand("((1 + 2)*2)+1"));