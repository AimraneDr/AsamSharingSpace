<?php

namespace App\Http\Controllers;
  
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Session;
use App\Models\User;
use Hash;
use Inertia\Inertia;

use Illuminate\Support\Facades\Route;

  
class AuthController extends Controller
{

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function login()
    {
        return inertia('Auth/Login', [
            'status' => session('status'),
        ]);
    }  

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function signup()
    {
        return inertia('Auth/Signup');
    }

       /**
     * Write code on Method
     *
     * @return response()
     */
    public function attemptLogin(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);
   
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return redirect()->intended('dashboard')
                        ->withSuccess('You have Successfully loggedin');
        }
  
        return redirect("login")->withSuccess('Oppes! You have entered invalid credentials');
    }
    
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function attemptSignUp(Request $request)
    {  
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'email' => 'required|email|unique:users',
            'tel' => 'required',
            'password' => 'required|min:8',
        ]);
           
        $data = $request->all();
        $check = User::create($data);
        return redirect("dashboard")->withSuccess('Great! You have Successfully loggedin');
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function dashboard()
    {
        if(Auth::check()){
            $user = auth()->user();
            return inertia('Dashboard',[
                'user' => [
                    'id' => $user->id,
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname,
                    'email' => $user->email,
                    'phonenumber' => $user->phonenumber,
                    'roles' => $user->roles()->pluck('name')->toArray(),
                ]
            ]);
        }
  
        return redirect("login")->withSuccess('Opps! You do not have access');
    }
    
     /**
     * Write code on Method
     *
     * @return response()
     */
    public function logout() {
        Session::flush();
        Auth::logout();
  
        return Redirect('login');
    }
}
