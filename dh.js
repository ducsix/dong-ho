document.addEventListener('DOMContentLoaded', () => {
    const stopwatches = document.querySelectorAll('.stopwatch'); //Lấy tất cả các phần tử có class stopwatch và lưu trữ chúng vào stopwatches.
    const stopAllButton = document.getElementById('stopAll');//Lấy phần tử có ID là stopAll (nút "Stop All") và lưu trữ nó vào stopAllButton.
    const timers = []; //Tạo một mảng rỗng để lưu trữ các hàm stopTimer của từng đồng hồ bấm giờ, giúp dễ dàng dừng tất cả đồng hồ khi cần.

    stopwatches.forEach((stopwatch, index) => {  //Lặp qua từng phần tử đồng hồ bấm giờ.

        const timeDisplay = stopwatch.querySelector('.time');  //Lấy phần tử hiển thị thời gian trong đồng hồ hiện tại.
        const startButton = stopwatch.querySelector('.start');  
        const stopButton = stopwatch.querySelector('.stop');  
        let intervalId = null;  // Biến để lưu trữ ID của interval (khoảng thời gian) được trả về bởi setInterval.
        let startTime = null; // Biến để lưu trữ thời gian bắt đầu của đồng hồ.

        function startTimer() {
            if (intervalId) return;
            startTime = new Date(); // Ghi lại thời gian bắt đầu.
            intervalId = setInterval(() => {  //  Cài đặt một interval để cập nhật thời gian mỗi giây.
                const elapsedTime = new Date(new Date() - startTime);   //Tính toán thời gian đã trôi qua.
                const minutes = String(elapsedTime.getUTCMinutes()).padStart(2, '0'); //Lấy số phút và định dạng thành chuỗi 2 chữ số.
                const seconds = String(elapsedTime.getUTCSeconds()).padStart(2, '0'); //___ số giấy ___ 
                timeDisplay.textContent = `${minutes}:${seconds}`; //Cập nhật hiển thị thời gian.

            }, 1000);
        }

        function stopTimer() {
            clearInterval(intervalId); //dừng interval
            intervalId = null; //Reset intervalId
            timeDisplay.textContent = '00:00'; //Reset hiển thị thời gian về 00:00.
        }

        startButton.addEventListener('click', startTimer);//thêm event listener cho nút start để bắt đầu khi nhấn
        stopButton.addEventListener('click', stopTimer);// giống nút start

        timers.push(stopTimer);//Thêm hàm stopTimer của đồng hồ hiện tại vào mảng timers để quản lý việc dừng tất cả đồng hồ.

    });

    stopAllButton.addEventListener('click', () => {
        timers.forEach(stopTimer => stopTimer());
    }); //Thêm event listener cho nút "Stop All" để dừng tất cả đồng hồ khi nhấn.

});
