import { EnumType } from 'jazzi'

export const Errors = EnumType("ValidationError", [
  "NoUserLogin",
  "EmptyTab",
  "TabNotFound",
  "CodeLength",
  "NotAMember",
  "AlreadySubbed",
])
