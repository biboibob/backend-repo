// export const APIError = (errorNum: number, message:string = "Somthing's Wrong Please Contact Developer") => {
//     if(errorNum === 400) {
//         res.status(400).send(error.message);
//     }
// }

export const apiHandler =
  (handler: any) => async (request: any, respond: any) => {
    try {
      return await handler(request, respond);
    } catch (error: any) {
      return respond.status(400).send("Something's Wrong Please Contact Developer")
    }
  };
