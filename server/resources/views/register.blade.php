<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>register</title>
</head>
<body>
<form method="POST" enctype="multipart/form-data" action="{{ route('registerAccount') }}">
    @csrf

    <label for="full_name">Full Name</label>
    <input type="text" name="full_name" >
    @error('full_name')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    <label for="email">Email</label>
    <input type="email" name="email" >
    @error('email')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('password')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('whatsapp_number')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('birth_place')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('birth_date')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('github_id')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('cv_path')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('id_path')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('line_id')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('is_team_leader')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('team_name')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    @error('team_password')
        <p style="color: red;">{{ $message }}</p>
    @enderror

    <label for="password">Password</label>
    <input type="password" name="password" >

    <label for="whatsapp_number">Whatsapp Number</label>
    <input type="text" name="whatsapp_number" >

    <label for="birth_place">Birth Place</label>
    <input type="text" name="birth_place" >

    <label for="birth_date">Github Id</label>
    <input type="date" name="birth_date" >

    <label for="github_id">Github Id</label>
    <input type="text" name="github_id" >

    <label for="cv_path">CV Image</label>
    <input type="file" name="cv_path" >

    <label for="id_path">ID Image</label>
    <input type="file" name="id_path" >

    <label for="line_id">Line ID</label>
    <input type="text" name="line_id" >

    <label for="team_name">Team Name</label>
    <input type="text" name="team_name">
    
    <label for="is_team_leader">Are you a team leader?</label>
    <select name="is_team_leader" default="yes">
        <option value="yes">Yes</option>
        <option value="no">No</option>
    </select>


    <div id="team-leader-fields" style="display:none;">

        <label for="team_password">Team Password</label>
        <input type="password" name="team_password">
    </div>


    <button type="submit">Register</button>
</form>

<script>
    // Show/Hide team leader fields based on selection
    document.querySelector('[name="is_team_leader"]').addEventListener('change', function () {
        const teamLeaderFields = document.getElementById('team-leader-fields');
        if (this.value === 'yes') {
            teamLeaderFields.style.display = 'block';
        } else {
            teamLeaderFields.style.display = 'none';
        }
    });
</script>

</body>
</html>