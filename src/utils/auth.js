import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'
const ID = 'ID'
const ModuleType = 'ModuleType'
const UserId = 'UserId'
const CustomId = 'CustomId'
const FreeId = 'FreeId'
const RentalId = 'RentalId'
const QuestionId = 'QuestionId'
const CodeId = 'CodeId'
const System = 'System'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setId(id) {
  return Cookies.set(ID, id)
}
export function getId() {
  return Cookies.get(ID)
}
export function setType(type) {
  return Cookies.set(ModuleType, type)
}
export function getType() {
  return Cookies.get(ModuleType)
}
export function setUserId(id) {
  return Cookies.set(UserId, id)
}
export function getUserId() {
  return Cookies.get(UserId)
}
export function removeUserId() {
  return Cookies.remove(UserId)
}
export function setCustomId(customId) {
  return Cookies.set(CustomId, customId)
}
export function getCustomId() {
  return Cookies.get(CustomId)
}
export function setFreeId(freeId) {
  return Cookies.set(FreeId, freeId)
}
export function getFreeId() {
  return Cookies.get(FreeId)
}
export function setRentalId(rentalId) {
  return Cookies.set(RentalId, rentalId)
}
export function getRentalId() {
  return Cookies.get(RentalId)
}
export function setCodeId(codeId) {
  return Cookies.set(CodeId, codeId)
}

export function getCodeId() {
  return Cookies.get(CodeId)
}

export function setSystem(system) {
  return Cookies.set(System, system)
}
export function getSystem() {
  return Cookies.get(System)
}
