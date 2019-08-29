function getTheAgreementForCookies() {
    let agreement = true;

    if(document.cookie.includes('agreed=true')){
        return agreement;
    }

    agreement = confirm('This website uses cookies to remember your progress.' +
        '\nNo personal data is collected.' +
        '\nClick \'Ok\' if you agree. If you disagree, your progress will be lost the moment you exit this site.');

    if(agreement){
        document.cookie = 'agreed=true';
    }

    return agreement;
}