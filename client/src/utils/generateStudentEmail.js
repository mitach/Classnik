export const generateStudentEmail = (firstName, lastName) => {
    let first = firstName.toLowerCase();
    let last = lastName.toLowerCase();
    let random = (Math.random() * 1000).toFixed(0);
    let email = `${first}.${last}${random}@npgpto.bg`;

    return email;
}