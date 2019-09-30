import { Request, Response, NextFunction } from "express";
import { get, post, validator, controller } from "./decorators";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

@controller("/auth")
class LoginController {
  @get("/login")
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" type="text" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    `);
  }

  @post("/login")
  @validator("email", "password")
  postLogin(req: RequestWithBody, res: Response) {
    const { email, password } = req.body;

    if (email === "qwerty@gmail.com" && password === "123") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  getLogout(req: Request, res: Response): void {
    req.session = undefined;
    res.redirect("/");
  }
}
