# component

1.  登陆表单

    - 字段 loginInfo \{username,password,error?}
      - 登录名 username : required,min6,max32,startWithAlphabet,\[a-z0-9],lowercase
      - 密码 password : required,min8,max32,anyCharacter
      - 错误信息 \[error=null]
      - 记住我 \[rememberMe=false]
    - 属性
      - loginInfo LoginInfo
    - 事件
      - login \{username,password}

2.  面包屑

    - 属性
      - routes \[\{name,routerLink}]
    - 事件
      - navTo

3.  Admin/Client/User Row

    - 属性
      - ClientInfo \{uid,sName,name,email,address,sapId,users,enabled}
      - UserInfo \{uid,name,email,address,roles,enabled}
      - AdminInfo \{uid,name,sapId,enabled}
    - 事件
      - select-client/user/admin
      - disable-client/user/admin

4.  Admins/Clients/Users Table

    - 属性
      - ClientInfoList \[ClientInfo]
      - UserInfoList \[UserInfo]
      - AdminInfoList \[AdminInfo]
    - 事件
      - select-client/user/admin
      - disable-client/user/admin

5.  RolesDragDrop

    - 属性
      - roles \[\{name,enabled}]
    - 事件
      - rolesChange

6.  Client/User/Admin DetailForm

    - 属性
      - Client/User/Admin
    - 事件
      - Client/User/Admin -Change

7.  Roles List

    - 属性
      - roles
    - 事件
      - rolesChange

8.  Search

    - 属性
      - searchTerm
    - 事件
      - search
      - searchTermChange
