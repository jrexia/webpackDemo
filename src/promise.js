function myPromise(fn) {
    let self                   = this;
    self.status                = 'pending';
    self.value                 = null;
    // 成功后的回调列表
    self.resolvedCallBackArray = [];
    // 失败回调列表
    self.rejectedCallBackArray = [];

    function resolve(value) {
        if (self.status !== 'pending') return;
        self.status = 'resolved';
        self.value  = value;
        console.log(self.rejectedCallBackArray, 'value');
        self.resolvedCallBackArray.forEach(item =>
            item(self.value));
    }

    function reject(value) {
        if (self.status !== 'pending') return;
        self.status = 'rejected';
        self.value  = value;
        self.rejectedCallBackArray.forEach(item =>
            item(self.value));
    }

    try {
        fn(resolve, reject);
    } catch (e) {
        reject(e);
    }
}

myPromise.prototype.then = function (onFulfilled, onRejected) {
    let self = this;
    switch (self.status) {
        case "pending":
            // 判断状态,如果当前还在等待,插入回调到队列
            self.resolvedCallBackArray.push(onFulfilled);
            self.rejectedCallBackArray.push(onRejected);
            break;
        case "resolved":
            // 下面两种是极端情况,在promise中不是耗时操作,一瞬间完成,
            // 导致瞬间执行到这里,resolvedCallBackArray/rejectedCallBackArray回调为空
            // 直接调用外部回调
            // 为了避免没有值,运行太快,不能把值传出去,特意加了一个 self.value 属性
            onFulfilled(self.value);
            break;
        case "rejected":
            onRejected(self.value);
            break;
        default:
    }
};

(() => {
    let p  = new myPromise((resolve, reject) => {
        // setTimeout(() => {
        //     resolve('成功回调');
        reject('失败');
        // }, 3000)
    });
    let p2 = p.then((value1) => {
        console.log('value1', value1);
    }, (reason) => {
        console.log('reason', reason);
    });
    p2.then((value2) => {
        console.log('value2', value2);
    }, (reason2) => {
        console.log('reason2', reason2)
    })
})();

console.log(0.1 === 0.10000000000000002, '------')