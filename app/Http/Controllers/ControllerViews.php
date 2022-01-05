<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ControllerViews extends Controller
{
    public function dependents(){
        return view('index');
    }
}
