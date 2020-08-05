const jwt = require('jsonwebtoken');

exports.isAuth =  (context) => {
    
      if(context.isAuth === false){
        throw new Error('Não autenticado !')
        return
      } else{
          const token = context.isAuth.split(' ')[1]
          
          if (!token || token === '') {
            throw new Error('Não autenticado !')
              return
          }
      
          let decodedToken
          try {
            decodedToken = jwt.verify(token, 'LAURASYSPACIENTE')
          } catch (err) {
            throw new Error('Não autenticado !')
              return
          }
          
          if (!decodedToken) {
            throw new Error('Não autenticado !')
            return
          }
      
          return true
      }
}