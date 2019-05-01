/**
 * 验证工具函数
 * @param type - 验证的数据类型
 * @param data - 需要验证的数据
 */
export default function validate(type, data) {
  switch (type) {
    case "email":
      let e_reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/gi
      return e_reg.test(data)
    case "phoneNumber":
      let p_reg = /^[1][3,4,5,7,8,9][0-9]{9}$/gi
      return p_reg.test(data)
    case "isAllNumber":
      let number_reg = /^\d+(?=\.{0,1}\d+$|$)/
      return number_reg.test(data)
    case "userName":
      let u_reg = /^[\u4E00-\u9FA5a-zA-Z0-9_-]{2,16}$/gi
      return u_reg.test(data)
  }
}
