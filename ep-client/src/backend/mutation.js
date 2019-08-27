export const createUser = `mutation createUser($input:InputCreateUserType!){
  createUser(input:$input){
    id firstName surname  username email role status createdBy
  }
}
`

export const updateRepUser = `mutation updateRep($input:InputUpdateRepType!){
  updateRep(input:$input){
    id firstName surname  username email role status createdBy
  }
}
`