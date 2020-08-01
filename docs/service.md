## 服务

### 全局服务

- accountService
  - token
    - renew timer
  - tokenValid()
  - loginUser
    - 鉴权只需要判断是否登陆
  - login()
  - logout()
- adminService
  - admins
    - 订阅 accountService 的 login/logout
  - create()
  - update()
- clientService
  - clients
    - 订阅 accountService 的 login/logout
  - select()
  - add()
  - update()
- userService
  - users
    - 订阅 accountService 的 login/logout
  - select()
  - add()
  - update()
- roleServices
  - roles
    - 订阅 accountService 的 login/logout
  - add()
  - delete()
- searchService
  - searchTerm string
  - searchResults \[Client|User]
- messageService (参考)[https://primefaces.org/primeng/showcase/#/messages]
  - 参考照抄

### 局部服务

- storageService (参考)[https://medium.com/@rupesh94/how-to-encrypt-localstorage-data-in-angular-270ebcbc1435]
  - constructor(secret_key:string)
  - encrypt
  - decrypt

### Router

- CanActivate,
- CanDeactivate
- CanLoad
- CanActivateChild

### Interceptors

- HeaderInterceptor
- ErrorInterceptors
- FakeBackendInterceptors
