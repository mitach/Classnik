export const generateStudentPassword = (firstName, lastName) => {
    let first = firstName.toLowerCase();
    let last = lastName.toLowerCase();

    let password = `${first}.${last}`;
    
    return password;
}