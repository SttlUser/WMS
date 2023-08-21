﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
        
    }
    public class LoginResponse
    {
        public int id { get; set; }
        public string username { get; set; }
        public Error ErrorInfo { get; set; }
    }
    public class SLLoginRequest
    {
        public string CompanyDB{get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
    public class ChangePassword
    {
        public int id { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public Error ErrorInfo { get; set; }
    }
    public class ChangePassRes
    {
        public int id { get; set; }
        public string Message { get; set; }
        public Error ErrorInfo { get; set; }
    }

    public class ForgotPassword
    {
        public int flag { get; set; }   
        public string Username { get; set; }
        public string NewPassword { get; set; }
    }

    public class ForgotPasswordResponse
    {
        public int UserId { get; set; }
        public string Message { get; set; }
    }
}


