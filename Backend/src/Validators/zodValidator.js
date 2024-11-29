
export const validate = function (Schema){
    return async function (req, res, next) {
        try {
            Schema.parse(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.errors || error.message,
            })
        }
    } 
};


  /*
   Using Zod Library we are doing validation, above function is like common middleware inside this middleware we
   wrote function ( Validate ) which expects Schema, schema  is going to be an object that we are sent through zod
   and then whenever we are going pass zod schema we have all relevant properties mentioned that we expect comes
   from request body.
  */