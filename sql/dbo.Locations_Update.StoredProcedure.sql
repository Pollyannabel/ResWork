USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[Locations_Update]    Script Date: 11/21/2023 6:06:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Pollyanna Easterbrook
-- Create date: 11/16/2023
-- Description:	Update a Location record from dbo.Locations.
-- Code Reviewer: Kelvin Hannah

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Locations_Update]
	   @LocationTypeId int
      ,@LineOne nvarchar(255)
      ,@LineTwo nvarchar(255)
      ,@City nvarchar(255)
      ,@Zip nvarchar(50)
      ,@StateId int
      ,@Latitude float
      ,@Longitude float
	  ,@ModifiedBy int
	  ,@Id int

/* Test code

Declare 
	  @LocationTypeId int = 1
      ,@LineOne nvarchar(255) = 'Line One String'
      ,@LineTwo nvarchar(255) = 'Line Two String'
      ,@City nvarchar(255) = 'City String'
      ,@Zip nvarchar(50) = 'Zip String'
      ,@StateId int = 1
      ,@Latitude float = 1.1
      ,@Longitude float = 1.1
	  ,@ModifiedBy int = 1
	  ,@Id int = 1


Declare @PageIndex int = 0,
	@PageSize int = 5

Execute dbo.Locations_SelectAll_Paginated
@PageIndex,
@PageSize


Execute dbo.Locations_Update 
		 @LocationTypeId
		,@LineOne
		,@LineTwo
		,@City
		,@Zip
		,@StateId
		,@Latitude
		,@Longitude
		,@ModifiedBy
		,@Id




*/

as

Begin

UPDATE [dbo].[Locations]
   SET [LocationTypeId] = @LocationTypeId
      ,[LineOne] = @LineOne
      ,[LineTwo] = @LineTwo
      ,[City] = @City
      ,[Zip] = @Zip
      ,[StateId] = @StateId
      ,[Latitude] = @Latitude
      ,[Longitude] = @Longitude
	  ,[ModifiedBy] = @ModifiedBy

 WHERE Id = @Id

End


GO
