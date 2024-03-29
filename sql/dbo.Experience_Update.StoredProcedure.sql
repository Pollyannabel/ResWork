USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Experience_Update]    Script Date: 12/6/2023 11:58:56 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 12/2/2023
-- Description:	Update an Experience record from dbo.Experience.
-- Code Reviewer: Thane Thompson

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[Experience_Update]
			@Id int
			,@UserId int
			,@ExperienceTypeId int
			,@IsCurrent int
			,@StartDate datetime2(7)
			,@EndDate datetime2(7)
			,@JobTitle varchar(50)
			,@CompanyName varchar(100)
			,@City varchar(50)
			,@State varchar(50)
			,@Country varchar(50)
			,@Description varchar(4000)
	  

as

/* Test Code

execute dbo.Experience_Select_All_Paginated @PageIndex = 0, @PageSize = 5

Declare 
		@Id int = 4
		,@UserId int = 1
	   ,@ExperienceTypeId int = 3
      ,@IsCurrent int = 0
      ,@StartDate datetime2(7) = '2003-02-02 00:00:00.0000000'
      ,@EndDate datetime2(7) = '2013-02-01 00:00:00.0000000'
      ,@JobTitle varchar(50) = 'Software Engineer'
      ,@CompanyName varchar(100) = 'Resolvely'
      ,@City varchar(50) = 'New York'
      ,@State varchar(50) = 'New York'
      ,@Country varchar(50) = 'USA'
      ,@Description varchar(4000) = 'Develop software' 
	  

execute dbo.Experience_Update	 
	   @Id 
	   ,@UserId 
	  ,@ExperienceTypeId
      ,@IsCurrent 
      ,@StartDate
      ,@EndDate
      ,@JobTitle
      ,@CompanyName
      ,@City 
      ,@State 
      ,@Country 
      ,@Description
	  

execute dbo.Experience_Select_All_Paginated @PageIndex = 0, @PageSize = 5

*/


BEGIN


UPDATE [dbo].[Experience]
   SET 
		UserId = @UserId
      ,[ExperienceTypeId] = @ExperienceTypeId
      ,[IsCurrent] = @IsCurrent
      ,[StartDate] = @StartDate
      ,[EndDate] = @EndDate
      ,[JobTitle] = @JobTitle
      ,[CompanyName] = @CompanyName
      ,[City] = @City
      ,[State] = @State
      ,[Country] = @Country
      ,[Description] = @Description
 WHERE Id = @Id

END

GO
