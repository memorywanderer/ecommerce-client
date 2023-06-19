import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
  try {
    const token = jwt.sign(
      { id },
      process.env.JWT_SECRET,
    )
    console.log({ token })
    return token
  } catch (error) {
    console.error('JWT generate error', error)
  }

}

export const verifyJwt = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET
    const decoded = jwt.decode(token, secretKey)
    return decoded
  } catch (error) {
    console.error('JWT verify error', error)
  }
}