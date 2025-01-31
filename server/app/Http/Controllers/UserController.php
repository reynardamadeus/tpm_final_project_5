<?php

namespace App\Http\Controllers;

use App\Models\Teams;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth ;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function showRegisterForm(){
        return view('register');
    }
    public function showLoginForm(){
        return view('login');
    }
    public function showParticipantDashboard(){
        return view('participant.dashboard');
    }
    public function register(Request $request){
        // Validate 
        $validated = $request->validate([
            'full_name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
            'whatsapp_number' => 'required',
            'github_id' => 'required|min:5',
            'birth_place' => 'required',
            'birth_date' => 'required',
            'cv_path' => 'required|file|mimes:pdf,doc,docx|max:2048',
            'id_path' => 'required|mimes:png,jpeg,jpg|max:2048',
            'line_id' => 'required|unique:users,line_id',
            'team_name' =>'required',
            'team_password' => $request->input('is_team_leader') === 'yes' ? 'required|min:8' : 'nullable',
        ],[
            'full_name.required' => 'Name is required.',
            'full_name.string' => 'Name must be a valid string.',
            'email.required' => 'Email is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email has already been registered.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters long.',
            'whatsapp_number.required' => 'Whatsapp number is required.',
            'github_id.required' => 'Github ID is required.',
            'github_id.min' => 'Github ID must be at least 5 characters long.',
            'birth_place.required' => 'Birth place is required.',
            'birth_date.required' => 'Birth date is required.',
            'cv_path.required' => 'CV is required.',
            'cv_path.file' => 'CV must be a file.',
            'cv_path.mimes' => 'CV must be a PDF, DOC, or DOCX file.',
            'cv_path.max' => 'CV file size must not exceed 2MB.',
            'id_path.required' => 'ID is required.',
            'id_path.mimes' => 'ID must be a PNG, JPEG, or JPG image.',
            'id_path.max' => 'ID image size must not exceed 2MB.',
            'line_id.required' => 'Line ID is required.',
            'line_id.unique' => 'This Line ID is already registered.',
            'team_name.required' => 'Team name is required.',
            'team_password.required' => 'Team password is required.',
            'team_password.min' => 'Team password must be at least 8 characters long.',
        ]);

        if (User::where('email', $request->email)->exists()) {
            return response()->json([
            'message' => 'Email already exists. Please choose another email .',
            ], 400);
        }

        if (User::where('team_name', $request->team_name)->exists()) {
            return response()->json([
            'message' => 'Team name already exists. Please choose another name.',
            ], 400);
        }

        $now = now()->format('Y-m-d_H.i.s');
        $filename = $now.'_'.$request->file('cv_path')->getClientOriginalName();
        $request->file('cv_path')->storeAs('public', $filename);

        $now = now()->format('Y-m-d_H.i.s');
            $filename = $now.'_'.$request->file('id_path')->getClientOriginalName();
            $request->file('id_path')->storeAs('public', $filename);

        $isTeamLeader = $request->input('is_team_leader') === 'yes';

        // If the user is a team leader
        if ($isTeamLeader) {
            $validated['password'] = bcrypt($validated['password']); // Encrypt password
            $user = User::create($validated);  
        
            $team = Teams::create([
                'name' => $validated['team_name'],  
                'password' => bcrypt($validated['team_password']),
                'leader_id' => $user->id,  
            ]);
        
            $user->team_id = $team->id;
            $user->role = 'team_leader';
            $user->save();
        
            return redirect()->route('login')->with('success', 'Registration successful!');
        } else {
            // Non-leader participant
            $team = Teams::where('name', $request->input('team_name'))->first();
        
            if (!$team) {
                return response()->json([
                    'message' => 'Team not found. Please provide a valid team name.',
                ], 400);
            }
        
            $validated['role'] = 'participant';
            $validated['team_id'] = $team->id;
            $validated['password'] = bcrypt($validated['password']); 
            $user = User::create($validated);
        
            return redirect()->route('login')->with('success', 'Registration successful!');
        }
    }

    public function login(Request $request){
        $isTeamLeader = $request->input('is_team_leader') === 'yes';

        if ($isTeamLeader) {
            $credentials = $request->validate([
                'team_name' => 'required',
                'team_password' => 'required',
            ]);

            $team = Teams::where('name', $credentials['team_name'])->first();
            if ($team && Hash::check($credentials['team_password'], $team->password)) {
                Auth::login($team->leader);
                return redirect()->route('team.dashboard');
            }
        } else {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (Auth::attempt($credentials)) {
                return redirect()->route('participant.dashboard');
            }
        }

        return back()->withErrors(['login' => 'Invalid credentials.']);
    }
}