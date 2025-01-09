
import {ValidationRules} from "./validation.js";
import {debounce} from "../util/debounce.js";

// 회원가입 정보를 서버에 전송하기
async function fetchToSignUp(userData){

    const response = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    alert(data.message);
}


// 초기화 함수
function initSignUp(){

    // form submit 이벤트
    const $form = document.querySelector('.auth-form')

    //입력 태그들을 읽어서 객체로 관리
    const $inputs ={
        emailOrPhone: $form.querySelector('input[name ="email"]'),
        name: $form.querySelector('input[name ="name"]'),
        username: $form.querySelector('input[name ="username"]'),
        password: $form.querySelector('input[name ="password"]'),
    };

    // 디바운스가 걸린 validateField 함수
    const debouncedValidate = debounce(validateField,700);

    const handleInput = ($input) => {
        removeErrorMessage($input.closest('.form-field'));
        debouncedValidate($input);
    }

    // 4개의 입력창에 입력 이벤트 바인딩
    Object.values($inputs).forEach($input => {
        $input.addEventListener('input', () => handleInput($input));
        $input.addEventListener('blur', () => handleInput($input));
    });






    //폼 이벤트 핸들러 바인딩
    $form.addEventListener('submit',e =>{
        e.preventDefault(); // 폼 전송시 발생하는 새로고침 방지

        // // 사용자가 입력한 모든 입력값 읽어오기
        // const emailOrPhone = document.querySelector('input[name = "email"]').value;
        // const name = document.querySelector('input[name = "name"]').value;
        // const username = document.querySelector('input[name = "username"]').value;
        // const password = document.querySelector('input[name = "password"]').value;
        //
        // const payload = {
        //     emailOrPhone: emailOrPhone,
        //     name: name,
        //     username: username,
        //     password: password
        // };

        // 서버로 데이터 전송
        fetchToSignUp(payload);

    })
}
// ==== 함수 정의 ==== //
// 입력값을 검증하고 에러메시지를 렌더링하는 함수
function validateField($input) {

    // 이게 어떤태그인지 알아오기
    const fieldName = $input.name;
    // 입력값 읽어오기
    const inputValue = $input.value.trim();
    // input의 부모 가져오기
    const $formField = $input.closest('.form-field');

    // 1. 빈 값 체크
    if (!inputValue) {
        // console.log(fieldName, ' is empty!');
        // 여기서 사용한 ?는 null이 아닐때 가져오게 한다.
        showError($formField,ValidationRules[fieldName]?.requiredMessage); // 에러메세지 렌더링
    }else{
        // 2. 상세체크 (패턴검증, 중복검증)
        //2-1 이메일, 전화번호 검증
        if(fieldName === 'email') {
            validateEmailOrPhone($formField,inputValue)
        }else if(fieldName === 'password'){

        }

    }

}
/* 에러 메시지를 표시하고, 필드에 error 클래스를 부여
*/
function showError($formField, message) {
    $formField.classList.add('error');
    const $errorSpan = document.createElement('span');
    $errorSpan.classList.add('error-message');
    $errorSpan.textContent = message;
    $formField.append($errorSpan);
}

/**
 * 에러 및 비밀번호 피드백을 제거한다.
 */
function removeErrorMessage($formField) {
    $formField.classList.remove('error');
    const error = $formField.querySelector('.error-message');
    if (error) error.remove();
}

// 이메일 또는 전화번호를 상세검증
function validateEmailOrPhone($formField, inputValue) {

    // 이메일 체크
    if (inputValue.includes('@')) {
        if (!ValidationRules.email.pattern.test(inputValue)) { // 패턴 체크
            showError($formField, ValidationRules.email.message);
        } else { // 서버에 통신해서 중복체크

        }
    } else {
        // 전화번호  체크
        // 전화번호 처리(숫자만 추출)
        const numbers = inputValue.replace(/[^0-9]/g, '');
        if (!ValidationRules.phone.pattern.test(numbers)) {
            // 패턴 체크
            showError($formField, ValidationRules.phone.message);
        } else {
            // 서버에 통신해서 중복체크
        }
    }

}


//==============메인 실행 코드=================//
document.addEventListener('DOMContentLoaded',initSignUp)