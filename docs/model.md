## 实体类

- 无默认值为必要字段

1. 管理员(Admin)

   | 字段名   | 类型    | 说明     | 默认值 |
   | -------- | ------- | -------- | ------ |
   | username | String  | 登陆名   |        |
   | name     | String  | 用户名   |        |
   | sapId    | string  | SAP ID   |        |
   | enabled  | boolean | 是否启用 | true   |

1. 用户(User)

   | 字段名   | 类型    | 说明     | 默认值 |
   | -------- | ------- | -------- | ------ |
   | username | String  | 用户名   |        |
   | name     | String  | 客户名   |        |
   | email    | String  | Email    | ''     |
   | address  | String  | Address  | ''     |
   | enabled  | boolean | 是否启用 | true   |
   | roles    | Role[]  | 权限列表 | []     |

1. 客户(Client)

   | 字段名   | 类型    | 说明     | 默认值 |
   | -------- | ------- | -------- | ------ |
   | username | String  | 登录名   |        |
   | name     | String  | 客户名   |        |
   | sName    | String  | 简称     | ''     |
   | sapId    | String  | SAP ID   |        |
   | email    | String  | Email    | ''     |
   | address  | String  | Address  | ''     |
   | enabled  | boolean | 是否启用 | true   |

1. 权限(Role)

   | 字段名  | 类型    | 说明     | 默认值 |
   | ------- | ------- | -------- | ------ |
   | name    | String  | 权限名   |        |
   | enabled | boolean | 是否启用 | false  |

1. 面包屑路径(Route)

   | 字段名     | 类型   | 说明     | 默认值 |
   | ---------- | ------ | -------- | ------ |
   | name       | String | 显示名称 |        |
   | routerLink | 链接   | 链接 url | null   |
