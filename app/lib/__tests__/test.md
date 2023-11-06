# What to test

- Mostly the domain code

## What to to write

- Mostly Stub and Spies

### Stubs

Let you be in a certain state for a part of your system.
The sub below make a loggedin user

```java
public class AcceptingAuthorizerStub implements Authorizer {
  public Boolean authorize(String username, String password) {
    return true;
  }
}
```

### Spies

Spies verify that a function was called that's it

```java
public class AcceptingAuthorizerSpy implements Authorizer {
  public boolean authorizeWasCalled = false;

  public Boolean authorize(String username, String password) {
    authorizeWasCalled = true;
    return true;
  }
}
```
