#!/bin/sh

# Lấy địa chỉ IP của host chạy container
HOST_IP=$(hostname -i)

# Xuất biến môi trường để có thể sử dụng bởi ứng dụng
export DOMAIN_BE=$HOST_IP

# Gọi lệnh để khởi động ứng dụng chính của bạn
exec "$@"
