INSERT INTO NguoiDung (name, email, pass_word, phone, birth_day, gender, role)
VALUES
  ('User1', 'user1@example.com', 'password1', '123456789', '1990-01-01', 'Male', 'User'),
  ('User2', 'user2@example.com', 'password2', '987654321', '1995-02-15', 'Female', 'User'),
  ('User3', 'user3@example.com', 'password3', '555555555', '1985-05-20', 'Male', 'User'),
  ('User4', 'user4@example.com', 'password4', '999999999', '1992-09-10', 'Female', 'User'),
  ('User5', 'user5@example.com', 'password5', '777777777', '1988-11-25', 'Male', 'User');

INSERT INTO ViTri (ten_vi_tri, tinh_thanh, quoc_gia, hinh_anh)
VALUES
  ('Location1', 'City1', 'Country1', 'location1.jpg'),
  ('Location2', 'City2', 'Country2', 'location2.jpg'),
  ('Location3', 'City3', 'Country3', 'location3.jpg'),
  ('Location4', 'City4', 'Country4', 'location4.jpg'),
  ('Location5', 'City5', 'Country5', 'location5.jpg');
  
INSERT INTO phong (ten_phong, khach, phong_ngu, giuong, phong_tam, mo_ta, gia_tien, may_giat, ban_la, tivi, dieu_hoa, wifi, bep, do_xe, ho_boi, ban_ui, hinh_anh, vitri, nguoi_dung_id)
VALUES
('Room A', 2, 1, 1, 1, 'Cozy room with a view', 100, true, true, true, true, true, true, true, false, false, 'path/to/image1.jpg', 1, 1),
('Room B', 3, 2, 2, 2, 'Spacious family room', 150, true, true, true, true, true, true, true, true, false, 'path/to/image2.jpg', 2, 2),
('Room C', 1, 1, 1, 1, 'Single room for solo travelers', 80, false, true, true, false, true, false, false, false, false, 'path/to/image3.jpg', 3, 3),
('Room D', 4, 2, 2, 1, 'Suitable for groups', 200, true, true, true, true, true, true, true, false, false, 'path/to/image4.jpg', 1, 4),
('Room E', 2, 1, 1, 1, 'Budget-friendly option', 70, false, false, true, false, true, false, false, false, false, 'path/to/image5.jpg', 2, 5);

  INSERT INTO BinhLuan (ma_phong, ma_nguoi_binh_luan, ngay_binh_luan, noi_dung, sao_binh_luan)
VALUES
  (1, 1, '2023-01-10 12:00:00', 'Comment1 for Room1', 5),
  (2, 2, '2023-02-15 15:30:00', 'Comment2 for Room2', 4),
  (3, 3, '2023-03-20 18:45:00', 'Comment3 for Room3', 3),
  (4, 4, '2023-04-05 09:15:00', 'Comment4 for Room4', 4),
  (5, 5, '2023-05-12 14:30:00', 'Comment5 for Room5', 5);


INSERT INTO DatPhong (ma_phong, ngay_den, ngay_di, so_luong_khach, ma_nguoi_dat)
VALUES
  (1, '2023-03-01', '2023-03-05', 2, 1),
  (2, '2023-04-10', '2023-04-15', 3, 2),
  (3, '2023-05-20', '2023-05-25', 2, 3),
  (4, '2023-06-15', '2023-06-20', 4, 4),
  (5, '2023-07-01', '2023-07-05', 2, 5);

