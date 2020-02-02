import * as jQuery from 'jquery'


class Service  {

	constructor() {
		this.baseUrl = 'https://' + window.location.host + "/"
	}

  post(url, data) { 
    return (
      new Promise((resolve, reject) => 
        jQuery.ajax(url,
          {
            method: 'POST'
            , data
            , accepts: 'application/x-www-form-urlencoded'
            , beforeSend: (xhr, options) => 
              this.onBeforeSend ? this.onBeforeSend(xhr) : null
            , success: (data, status, xhr) => 
              this.onSuccess ? this.onSuccess(xhr, data, resolve) : null
            , error: (xhr, status, errorThrown) => 
              this.onError? this.onError(xhr, errorThrown, reject) : null
          })
      )
    )  
  }
  
  get(url) {
    return ( 
      new Promise((resolve, reject) => {
        jQuery.ajax(url,
          {
            method: 'GET'
            , accepts: 'application/json'
            , beforeSend: (xhr, options) => 
              this.onBeforeSend ? this.onBeforeSend(xhr) : null
            , success: (data, status, xhr) => 
              this.onSuccess ? this.onSuccess(xhr, data, resolve) : null
            , error: (xhr, status, errmsg) => 
              this.onError? this.onError(xhr, errmsg, reject) : null
          })
      })
    )
	}
	
	toURL (path, params) {
    if (path[0] === '/')
      path = path.substring(1);

    return this.baseUrl + path
  }

  toFormEncoded(params) {
    let parrs = []
    for (const property in params) 
      parrs.push(`${property}=${params[property]}`)
    
    return parrs.join('&')
  }
}


class OptimizeService extends Service  {
	
  async optimize (amount) {
    let retval = {}
    try {
      let data = this.toFormEncoded({totalAmount:amount})
      retval = await this.post(this.toURL('/optimize'), data)
    } catch (e) {
      console.error('Optimize failed with: ', e)
    }
    return retval
  }
 
  onSuccess (xhr, data, resolve) {
    resolve({
      Ok : true,
      Content: data
    })
  }

  onError(xhr, errmsg, reject) {
    reject({
      Ok : false,
      Message: errmsg
    })
  }
}


const OptimizeServiceFactory = function () {}
OptimizeServiceFactory.prototype.create = () => new OptimizeService()

export default Object.create(OptimizeServiceFactory.prototype)


